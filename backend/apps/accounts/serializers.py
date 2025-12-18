"""
Serializers for accounts app.
"""
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User, OTP, UserAddress


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""

    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'phone_number', 'email', 'first_name', 'last_name', 'full_name',
            'national_id', 'profile_image', 'date_of_birth', 'is_verified',
            'verification_status', 'created_at'
        ]
        read_only_fields = ['id', 'is_verified', 'verification_status', 'created_at']


class RegisterSerializer(serializers.Serializer):
    """Serializer for user registration."""

    phone_number = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    def validate_phone_number(self, value):
        """Validate phone number format and uniqueness."""
        # Basic validation - you can add more sophisticated validation
        if not value.startswith('09') or len(value) != 11:
            raise serializers.ValidationError('شماره تلفن باید با 09 شروع شده و 11 رقم باشد')

        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError('این شماره تلفن قبلاً ثبت شده است')

        return value

    def validate(self, attrs):
        """Validate that passwords match."""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'رمز عبور و تایید رمز عبور مطابقت ندارند'})
        return attrs


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""

    phone_number = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True)


class SendOTPSerializer(serializers.Serializer):
    """Serializer for sending OTP."""

    phone_number = serializers.CharField(max_length=20)
    otp_type = serializers.ChoiceField(choices=OTP.OTP_TYPE_CHOICES)


class VerifyOTPSerializer(serializers.Serializer):
    """Serializer for verifying OTP."""

    phone_number = serializers.CharField(max_length=20)
    code = serializers.CharField(max_length=6)
    otp_type = serializers.ChoiceField(choices=OTP.OTP_TYPE_CHOICES)


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password."""

    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """Validate that new passwords match."""
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({'new_password_confirm': 'رمز عبور جدید و تایید آن مطابقت ندارند'})
        return attrs


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile."""

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'date_of_birth', 'profile_image']


class VerificationSubmitSerializer(serializers.ModelSerializer):
    """Serializer for submitting verification documents."""

    class Meta:
        model = User
        fields = ['national_id', 'id_card_image', 'selfie_image']

    def validate_national_id(self, value):
        """Validate national ID."""
        if not value or len(value) != 10:
            raise serializers.ValidationError('کد ملی باید 10 رقم باشد')

        # Check if national ID is already used by another user
        user = self.context.get('request').user
        if User.objects.filter(national_id=value).exclude(id=user.id).exists():
            raise serializers.ValidationError('این کد ملی قبلاً ثبت شده است')

        return value


class UserAddressSerializer(serializers.ModelSerializer):
    """Serializer for user addresses."""

    class Meta:
        model = UserAddress
        fields = [
            'id', 'title', 'province', 'city', 'address',
            'postal_code', 'is_default', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_postal_code(self, value):
        """Validate postal code."""
        if not value or len(value) != 10:
            raise serializers.ValidationError('کد پستی باید 10 رقم باشد')
        return value
