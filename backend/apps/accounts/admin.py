"""
Admin configuration for accounts app.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, OTP, UserAddress


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin interface for User model."""

    list_display = ['phone_number', 'first_name', 'last_name', 'is_verified', 'is_active', 'created_at']
    list_filter = ['is_verified', 'is_active', 'verification_status', 'created_at']
    search_fields = ['phone_number', 'first_name', 'last_name', 'email', 'national_id']
    ordering = ['-created_at']

    fieldsets = (
        ('اطلاعات احراز هویت', {
            'fields': ('phone_number', 'password')
        }),
        ('اطلاعات شخصی', {
            'fields': ('first_name', 'last_name', 'email', 'national_id', 'date_of_birth', 'profile_image')
        }),
        ('تایید هویت', {
            'fields': ('is_verified', 'verification_status', 'id_card_image', 'selfie_image')
        }),
        ('دسترسی‌ها', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('تاریخ‌ها', {
            'fields': ('last_login', 'created_at', 'updated_at')
        }),
    )

    readonly_fields = ['created_at', 'updated_at', 'last_login']

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2'),
        }),
    )


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    """Admin interface for OTP model."""

    list_display = ['phone_number', 'code', 'otp_type', 'is_used', 'expires_at', 'created_at']
    list_filter = ['otp_type', 'is_used', 'created_at']
    search_fields = ['phone_number', 'code']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']


@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    """Admin interface for UserAddress model."""

    list_display = ['user', 'title', 'city', 'is_default', 'created_at']
    list_filter = ['is_default', 'province', 'city']
    search_fields = ['user__phone_number', 'title', 'city', 'address']
    readonly_fields = ['created_at', 'updated_at']
