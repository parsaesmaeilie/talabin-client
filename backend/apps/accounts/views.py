"""
Views for accounts app.
"""
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

from .models import User, OTP, UserAddress
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    SendOTPSerializer, VerifyOTPSerializer, ChangePasswordSerializer,
    ProfileUpdateSerializer, VerificationSubmitSerializer, UserAddressSerializer
)
from apps.core.utils import generate_otp, is_otp_expired
from apps.core.exceptions import OTPExpiredException, InvalidOTPException
from apps.core.sms import sms_service


class AuthViewSet(viewsets.GenericViewSet):
    """ViewSet for authentication operations."""

    permission_classes = [AllowAny]

    @method_decorator(ratelimit(key='ip', rate='5/h', method='POST'))
    @action(detail=False, methods=['post'])
    def register(self, request):
        """Register a new user."""
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create user
        user = User.objects.create_user(
            phone_number=serializer.validated_data['phone_number'],
            password=serializer.validated_data['password']
        )

        # Generate OTP for phone verification
        otp_code = generate_otp(settings.OTP_LENGTH)
        expires_at = timezone.now() + timedelta(minutes=settings.OTP_EXPIRY_MINUTES)

        OTP.objects.create(
            user=user,
            phone_number=user.phone_number,
            code=otp_code,
            otp_type='registration',
            expires_at=expires_at
        )

        # Send OTP via SMS
        sms_sent = sms_service.send_otp(
            phone_number=str(user.phone_number),
            otp_code=otp_code
        )

        if not sms_sent and not settings.DEBUG:
            return Response({
                'success': False,
                'error': {'message': 'خطا در ارسال پیامک. لطفاً دوباره تلاش کنید.'}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'success': True,
            'message': 'ثبت‌نام با موفقیت انجام شد. کد تایید به شماره شما ارسال شد.',
            'data': {
                'phone_number': str(user.phone_number),
            }
        }, status=status.HTTP_201_CREATED)

    @method_decorator(ratelimit(key='ip', rate='10/h', method='POST'))
    @action(detail=False, methods=['post'])
    def login(self, request):
        """Login user with phone and password."""
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            phone_number=serializer.validated_data['phone_number'],
            password=serializer.validated_data['password']
        )

        if not user:
            return Response({
                'success': False,
                'error': {'message': 'شماره تلفن یا رمز عبور اشتباه است'}
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({
                'success': False,
                'error': {'message': 'حساب کاربری شما غیرفعال است'}
            }, status=status.HTTP_403_FORBIDDEN)

        # Generate tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            'success': True,
            'message': 'ورود با موفقیت انجام شد',
            'data': {
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }
            }
        })

    @method_decorator(ratelimit(key='ip', rate='3/5m', method='POST'))
    @action(detail=False, methods=['post'])
    def send_otp(self, request):
        """Send OTP to phone number."""
        serializer = SendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        otp_type = serializer.validated_data['otp_type']

        # Generate OTP
        otp_code = generate_otp(settings.OTP_LENGTH)
        expires_at = timezone.now() + timedelta(minutes=settings.OTP_EXPIRY_MINUTES)

        # Create OTP record
        OTP.objects.create(
            phone_number=phone_number,
            code=otp_code,
            otp_type=otp_type,
            expires_at=expires_at
        )

        # Send OTP via SMS
        sms_sent = sms_service.send_otp(
            phone_number=str(phone_number),
            otp_code=otp_code
        )

        if not sms_sent and not settings.DEBUG:
            return Response({
                'success': False,
                'error': {'message': 'خطا در ارسال پیامک. لطفاً دوباره تلاش کنید.'}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'success': True,
            'message': 'کد تایید ارسال شد',
            'data': {}
        })

    @method_decorator(ratelimit(key='user_or_ip', rate='5/10m', method='POST'))
    @action(detail=False, methods=['post'])
    def verify_otp(self, request):
        """Verify OTP code."""
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        code = serializer.validated_data['code']
        otp_type = serializer.validated_data['otp_type']

        # Find OTP
        try:
            otp = OTP.objects.filter(
                phone_number=phone_number,
                code=code,
                otp_type=otp_type,
                is_used=False
            ).latest('created_at')
        except OTP.DoesNotExist:
            raise InvalidOTPException()

        # Check if expired
        if is_otp_expired(otp.created_at, settings.OTP_EXPIRY_MINUTES):
            raise OTPExpiredException()

        # Mark as used
        otp.is_used = True
        otp.save()

        # If registration OTP, mark user as verified
        if otp_type == 'registration' and otp.user:
            otp.user.is_verified = True
            otp.user.save()

        return Response({
            'success': True,
            'message': 'کد تایید با موفقیت تایید شد'
        })

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        """Logout user by blacklisting refresh token."""
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({
                'success': True,
                'message': 'خروج با موفقیت انجام شد'
            })
        except Exception:
            return Response({
                'success': False,
                'error': {'message': 'خطا در خروج از حساب کاربری'}
            }, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for user operations."""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return only the current user."""
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user profile."""
        serializer = self.get_serializer(request.user)
        return Response({
            'success': True,
            'data': serializer.data
        })

    @action(detail=False, methods=['put', 'patch'])
    def update_profile(self, request):
        """Update user profile."""
        serializer = ProfileUpdateSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'success': True,
            'message': 'پروفایل با موفقیت بروزرسانی شد',
            'data': UserSerializer(request.user).data
        })

    @method_decorator(ratelimit(key='user', rate='5/h', method='POST'))
    @action(detail=False, methods=['post'])
    def change_password(self, request):
        """Change user password."""
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user

        # Check old password
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({
                'success': False,
                'error': {'message': 'رمز عبور فعلی اشتباه است'}
            }, status=status.HTTP_400_BAD_REQUEST)

        # Set new password
        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({
            'success': True,
            'message': 'رمز عبور با موفقیت تغییر کرد'
        })

    @action(detail=False, methods=['post'])
    def submit_verification(self, request):
        """Submit verification documents."""
        serializer = VerificationSubmitSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.verification_status = 'pending'
        user.save()

        return Response({
            'success': True,
            'message': 'مدارک شما برای بررسی ارسال شد',
            'data': UserSerializer(user).data
        })


class UserAddressViewSet(viewsets.ModelViewSet):
    """ViewSet for user addresses."""

    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return only current user's addresses."""
        return UserAddress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Set user when creating address."""
        # If this is set as default, unset others
        if serializer.validated_data.get('is_default', False):
            UserAddress.objects.filter(user=self.request.user, is_default=True).update(is_default=False)

        serializer.save(user=self.request.user)
