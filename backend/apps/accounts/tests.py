"""
Tests for accounts app.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from datetime import timedelta

from .models import OTP, UserAddress
from apps.wallet.models import Wallet

User = get_user_model()


class UserModelTest(TestCase):
    """Tests for User model."""

    def setUp(self):
        self.user = User.objects.create_user(
            phone_number='+989123456789',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )

    def test_user_creation(self):
        """Test user is created successfully."""
        self.assertEqual(self.user.phone_number, '+989123456789')
        self.assertTrue(self.user.check_password('testpass123'))
        self.assertEqual(self.user.full_name, 'Test User')
        self.assertFalse(self.user.is_verified)

    def test_wallet_creation_on_user_creation(self):
        """Test wallet is created when user is created."""
        wallet = Wallet.objects.filter(user=self.user).first()
        self.assertIsNotNone(wallet)
        self.assertEqual(wallet.balance_irr, 0)
        self.assertEqual(wallet.gold_balance, 0)

    def test_user_str_representation(self):
        """Test string representation of user."""
        self.assertEqual(str(self.user), '+989123456789')


class AuthenticationAPITest(APITestCase):
    """Tests for authentication endpoints."""

    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/auth/register/'
        self.login_url = '/api/auth/login/'
        self.send_otp_url = '/api/auth/send-otp/'
        self.verify_otp_url = '/api/auth/verify-otp/'

    def test_user_registration(self):
        """Test user registration endpoint."""
        data = {
            'phone_number': '+989121234567',
            'password': 'SecurePass123!'
        }
        response = self.client.post(self.register_url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertIn('phone_number', response.data['data'])
        self.assertNotIn('otp_code', response.data['data'])  # Security check

        # Verify user was created
        user = User.objects.get(phone_number='+989121234567')
        self.assertIsNotNone(user)
        self.assertFalse(user.is_verified)

    def test_registration_duplicate_phone(self):
        """Test registration with duplicate phone number fails."""
        User.objects.create_user(
            phone_number='+989121234567',
            password='password123'
        )

        data = {
            'phone_number': '+989121234567',
            'password': 'NewPassword123!'
        }
        response = self.client.post(self.register_url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_success(self):
        """Test successful user login."""
        user = User.objects.create_user(
            phone_number='+989123456789',
            password='testpass123'
        )
        user.is_verified = True
        user.save()

        data = {
            'phone_number': '+989123456789',
            'password': 'testpass123'
        }
        response = self.client.post(self.login_url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertIn('tokens', response.data['data'])
        self.assertIn('access', response.data['data']['tokens'])
        self.assertIn('refresh', response.data['data']['tokens'])
        self.assertIn('user', response.data['data'])

    def test_login_invalid_credentials(self):
        """Test login with invalid credentials fails."""
        User.objects.create_user(
            phone_number='+989123456789',
            password='testpass123'
        )

        data = {
            'phone_number': '+989123456789',
            'password': 'wrongpassword'
        }
        response = self.client.post(self.login_url, data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data['success'])

    def test_login_inactive_user(self):
        """Test login with inactive user fails."""
        user = User.objects.create_user(
            phone_number='+989123456789',
            password='testpass123'
        )
        user.is_active = False
        user.save()

        data = {
            'phone_number': '+989123456789',
            'password': 'testpass123'
        }
        response = self.client.post(self.login_url, data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class OTPTest(APITestCase):
    """Tests for OTP functionality."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            phone_number='+989123456789',
            password='testpass123'
        )

    def test_otp_creation(self):
        """Test OTP is created successfully."""
        otp = OTP.objects.create(
            user=self.user,
            phone_number=self.user.phone_number,
            code='123456',
            otp_type='registration',
            expires_at=timezone.now() + timedelta(minutes=5)
        )

        self.assertEqual(otp.code, '123456')
        self.assertFalse(otp.is_used)
        self.assertEqual(otp.user, self.user)

    def test_verify_otp_success(self):
        """Test OTP verification succeeds with valid code."""
        # Create OTP
        otp = OTP.objects.create(
            user=self.user,
            phone_number=self.user.phone_number,
            code='123456',
            otp_type='registration',
            expires_at=timezone.now() + timedelta(minutes=5)
        )

        data = {
            'phone_number': '+989123456789',
            'code': '123456',
            'otp_type': 'registration'
        }
        response = self.client.post('/api/auth/verify-otp/', data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])

        # Check OTP is marked as used
        otp.refresh_from_db()
        self.assertTrue(otp.is_used)

        # Check user is verified
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_verified)

    def test_verify_invalid_otp(self):
        """Test OTP verification fails with invalid code."""
        OTP.objects.create(
            user=self.user,
            phone_number=self.user.phone_number,
            code='123456',
            otp_type='registration',
            expires_at=timezone.now() + timedelta(minutes=5)
        )

        data = {
            'phone_number': '+989123456789',
            'code': '654321',  # Wrong code
            'otp_type': 'registration'
        }
        response = self.client.post('/api/auth/verify-otp/', data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserProfileTest(APITestCase):
    """Tests for user profile operations."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            phone_number='+989123456789',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

    def test_get_current_user(self):
        """Test getting current user profile."""
        response = self.client.get('/api/auth/me/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['phone_number'], '+989123456789')
        self.assertEqual(response.data['data']['first_name'], 'Test')

    def test_update_profile(self):
        """Test updating user profile."""
        data = {
            'first_name': 'Updated',
            'last_name': 'Name',
            'email': 'test@example.com'
        }
        response = self.client.put('/api/auth/update-profile/', data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])

        # Verify changes
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'Updated')
        self.assertEqual(self.user.last_name, 'Name')
        self.assertEqual(self.user.email, 'test@example.com')

    def test_change_password(self):
        """Test changing user password."""
        data = {
            'old_password': 'testpass123',
            'new_password': 'NewSecurePass456!'
        }
        response = self.client.post('/api/auth/change-password/', data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])

        # Verify password changed
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('NewSecurePass456!'))
        self.assertFalse(self.user.check_password('testpass123'))

    def test_change_password_wrong_old_password(self):
        """Test changing password with wrong old password fails."""
        data = {
            'old_password': 'wrongpassword',
            'new_password': 'NewSecurePass456!'
        }
        response = self.client.post('/api/auth/change-password/', data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserAddressTest(APITestCase):
    """Tests for user address operations."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            phone_number='+989123456789',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_address(self):
        """Test creating a new address."""
        data = {
            'title': 'Home',
            'address': 'Test Street, Test City',
            'postal_code': '1234567890',
            'is_default': True
        }
        response = self.client.post('/api/auth/addresses/', data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify address created
        address = UserAddress.objects.filter(user=self.user).first()
        self.assertIsNotNone(address)
        self.assertEqual(address.title, 'Home')
        self.assertTrue(address.is_default)

    def test_list_user_addresses(self):
        """Test listing user addresses."""
        UserAddress.objects.create(
            user=self.user,
            title='Home',
            address='Address 1',
            postal_code='1234567890'
        )
        UserAddress.objects.create(
            user=self.user,
            title='Work',
            address='Address 2',
            postal_code='0987654321'
        )

        response = self.client.get('/api/auth/addresses/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_user_can_only_see_own_addresses(self):
        """Test user can only see their own addresses."""
        other_user = User.objects.create_user(
            phone_number='+989121111111',
            password='testpass123'
        )
        UserAddress.objects.create(
            user=other_user,
            title='Other User Address',
            address='Other Address',
            postal_code='1111111111'
        )

        response = self.client.get('/api/auth/addresses/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
