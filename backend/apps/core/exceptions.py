"""
Custom exception handlers for the API.
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Custom exception handler that returns consistent error responses.
    """
    response = exception_handler(exc, context)

    if response is not None:
        custom_response_data = {
            'success': False,
            'error': {
                'message': str(exc),
                'details': response.data if isinstance(response.data, dict) else {'detail': response.data}
            }
        }
        response.data = custom_response_data

    return response


class APIException(Exception):
    """Base API exception."""
    default_message = 'An error occurred.'
    status_code = status.HTTP_400_BAD_REQUEST

    def __init__(self, message=None, status_code=None):
        self.message = message or self.default_message
        if status_code:
            self.status_code = status_code


class InsufficientBalanceException(APIException):
    """Raised when user has insufficient balance."""
    default_message = 'موجودی ناکافی است.'
    status_code = status.HTTP_400_BAD_REQUEST


class InvalidTransactionException(APIException):
    """Raised when transaction is invalid."""
    default_message = 'تراکنش نامعتبر است.'
    status_code = status.HTTP_400_BAD_REQUEST


class OTPExpiredException(APIException):
    """Raised when OTP has expired."""
    default_message = 'کد تایید منقضی شده است.'
    status_code = status.HTTP_400_BAD_REQUEST


class InvalidOTPException(APIException):
    """Raised when OTP is invalid."""
    default_message = 'کد تایید نامعتبر است.'
    status_code = status.HTTP_400_BAD_REQUEST
