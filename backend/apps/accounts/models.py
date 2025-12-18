"""
User and authentication models.
"""
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from apps.core.models import TimeStampedModel
from apps.core.validators import validate_image_file_extension, validate_file_size


class UserManager(BaseUserManager):
    """Custom user manager."""

    def create_user(self, phone_number, password=None, **extra_fields):
        """Create and save a regular user."""
        if not phone_number:
            raise ValueError('شماره تلفن الزامی است')

        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        """Create and save a superuser."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(phone_number, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    """Custom user model using phone number as username."""

    VERIFICATION_STATUS_CHOICES = [
        ('pending', 'در انتظار تایید'),
        ('verified', 'تایید شده'),
        ('rejected', 'رد شده'),
    ]

    phone_number = PhoneNumberField(unique=True, verbose_name='شماره تلفن')
    email = models.EmailField(blank=True, null=True, verbose_name='ایمیل')
    first_name = models.CharField(max_length=100, blank=True, verbose_name='نام')
    last_name = models.CharField(max_length=100, blank=True, verbose_name='نام خانوادگی')
    national_id = models.CharField(max_length=10, blank=True, null=True, unique=True, verbose_name='کد ملی')

    # Profile fields
    profile_image = models.ImageField(
        upload_to='profiles/',
        blank=True,
        null=True,
        verbose_name='تصویر پروفایل',
        validators=[validate_image_file_extension, validate_file_size]
    )
    date_of_birth = models.DateField(blank=True, null=True, verbose_name='تاریخ تولد')

    # Verification fields
    is_verified = models.BooleanField(default=False, verbose_name='تایید شده')
    verification_status = models.CharField(
        max_length=20,
        choices=VERIFICATION_STATUS_CHOICES,
        default='pending',
        verbose_name='وضعیت تایید هویت'
    )
    id_card_image = models.ImageField(
        upload_to='id_cards/',
        blank=True,
        null=True,
        verbose_name='تصویر کارت ملی',
        validators=[validate_image_file_extension, validate_file_size]
    )
    selfie_image = models.ImageField(
        upload_to='selfies/',
        blank=True,
        null=True,
        verbose_name='تصویر سلفی',
        validators=[validate_image_file_extension, validate_file_size]
    )

    # Status fields
    is_active = models.BooleanField(default=True, verbose_name='فعال')
    is_staff = models.BooleanField(default=False, verbose_name='کارمند')

    objects = UserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران'
        db_table = 'users'

    def __str__(self):
        return str(self.phone_number)

    @property
    def full_name(self):
        """Return user's full name."""
        return f"{self.first_name} {self.last_name}".strip() or str(self.phone_number)


class OTP(TimeStampedModel):
    """OTP model for phone verification."""

    OTP_TYPE_CHOICES = [
        ('registration', 'ثبت‌نام'),
        ('login', 'ورود'),
        ('password_reset', 'بازیابی رمز عبور'),
        ('phone_verification', 'تایید شماره تلفن'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otps', null=True, blank=True, verbose_name='کاربر')
    phone_number = PhoneNumberField(verbose_name='شماره تلفن')
    code = models.CharField(max_length=6, verbose_name='کد')
    otp_type = models.CharField(max_length=20, choices=OTP_TYPE_CHOICES, verbose_name='نوع کد')
    is_used = models.BooleanField(default=False, verbose_name='استفاده شده')
    expires_at = models.DateTimeField(verbose_name='تاریخ انقضا')

    class Meta:
        verbose_name = 'کد تایید'
        verbose_name_plural = 'کدهای تایید'
        db_table = 'otps'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.phone_number} - {self.code}"


class UserAddress(TimeStampedModel):
    """User address model."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses', verbose_name='کاربر')
    title = models.CharField(max_length=100, verbose_name='عنوان')
    province = models.CharField(max_length=100, verbose_name='استان')
    city = models.CharField(max_length=100, verbose_name='شهر')
    address = models.TextField(verbose_name='آدرس')
    postal_code = models.CharField(max_length=10, verbose_name='کد پستی')
    is_default = models.BooleanField(default=False, verbose_name='پیش‌فرض')

    class Meta:
        verbose_name = 'آدرس کاربر'
        verbose_name_plural = 'آدرس‌های کاربران'
        db_table = 'user_addresses'

    def __str__(self):
        return f"{self.user.phone_number} - {self.title}"
