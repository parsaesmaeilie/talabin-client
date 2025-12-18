"""Custom validators for the application."""
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator


def validate_file_size(file):
    """
    Validate uploaded file size (max 5MB).

    Args:
        file: The uploaded file object

    Raises:
        ValidationError: If file size exceeds 5MB
    """
    max_size_mb = 5
    max_size_bytes = max_size_mb * 1024 * 1024

    if file.size > max_size_bytes:
        raise ValidationError(
            f'حجم فایل نباید بیشتر از {max_size_mb} مگابایت باشد. '
            f'حجم فایل شما: {file.size / (1024 * 1024):.2f} مگابایت'
        )


def validate_image_file_extension(file):
    """
    Validate that the file is an image (jpg, jpeg, png).

    Args:
        file: The uploaded file object

    Raises:
        ValidationError: If file extension is not allowed
    """
    validator = FileExtensionValidator(
        allowed_extensions=['jpg', 'jpeg', 'png'],
        message='فقط فایل‌های JPG و PNG مجاز هستند.'
    )
    validator(file)


def validate_document_file_extension(file):
    """
    Validate that the file is a document (jpg, jpeg, png, pdf).

    Args:
        file: The uploaded file object

    Raises:
        ValidationError: If file extension is not allowed
    """
    validator = FileExtensionValidator(
        allowed_extensions=['jpg', 'jpeg', 'png', 'pdf'],
        message='فقط فایل‌های JPG، PNG و PDF مجاز هستند.'
    )
    validator(file)


def validate_receipt_file(file):
    """
    Validate receipt image file.
    Must be an image and under 5MB.

    Args:
        file: The uploaded file object

    Raises:
        ValidationError: If file is invalid
    """
    validate_image_file_extension(file)
    validate_file_size(file)


def validate_identity_document(file):
    """
    Validate identity document file.
    Must be an image or PDF and under 5MB.

    Args:
        file: The uploaded file object

    Raises:
        ValidationError: If file is invalid
    """
    validate_document_file_extension(file)
    validate_file_size(file)
