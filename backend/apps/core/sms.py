"""SMS service for sending OTP and notifications."""
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class SMSService:
    """SMS service using Kavenegar."""

    def __init__(self):
        self.api_key = getattr(settings, 'KAVENEGAR_API_KEY', '')
        self.sender = getattr(settings, 'SMS_SENDER', '10008663')
        self.base_url = "https://api.kavenegar.com/v1"

    def send_otp(self, phone_number: str, otp_code: str) -> bool:
        """
        Send OTP code via SMS.

        Args:
            phone_number: Recipient phone number
            otp_code: OTP code to send

        Returns:
            True if SMS sent successfully, False otherwise
        """
        if settings.DEBUG:
            logger.info(f"[DEBUG MODE] SMS to {phone_number}: کد تایید شما: {otp_code}")
            print(f"[DEV MODE] OTP Code for {phone_number}: {otp_code}")
            return True

        if not self.api_key:
            logger.error("KAVENEGAR_API_KEY not configured")
            return False

        try:
            url = f"{self.base_url}/{self.api_key}/sms/send.json"
            message = f"کد تایید تالابین: {otp_code}\nاین کد تا 5 دقیقه اعتبار دارد."

            response = requests.post(
                url,
                data={
                    'receptor': phone_number,
                    'sender': self.sender,
                    'message': message,
                },
                timeout=10
            )

            if response.status_code == 200:
                result = response.json()
                if result.get('return', {}).get('status') == 200:
                    logger.info(f"SMS sent successfully to {phone_number}")
                    return True
                else:
                    logger.error(f"SMS API returned error: {result}")
                    return False

            logger.error(f"SMS sending failed: {response.status_code} - {response.text}")
            return False

        except requests.Timeout:
            logger.error(f"SMS sending timeout for {phone_number}")
            return False
        except Exception as e:
            logger.error(f"SMS sending error: {str(e)}")
            return False

    def send_notification(self, phone_number: str, message: str) -> bool:
        """
        Send general notification SMS.

        Args:
            phone_number: Recipient phone number
            message: Message content

        Returns:
            True if SMS sent successfully, False otherwise
        """
        if settings.DEBUG:
            logger.info(f"[DEBUG MODE] SMS to {phone_number}: {message}")
            print(f"[DEV MODE] Notification for {phone_number}: {message}")
            return True

        if not self.api_key:
            logger.error("KAVENEGAR_API_KEY not configured")
            return False

        try:
            url = f"{self.base_url}/{self.api_key}/sms/send.json"

            response = requests.post(
                url,
                data={
                    'receptor': phone_number,
                    'sender': self.sender,
                    'message': message,
                },
                timeout=10
            )

            if response.status_code == 200:
                logger.info(f"Notification sent successfully to {phone_number}")
                return True

            logger.error(f"Notification sending failed: {response.status_code}")
            return False

        except Exception as e:
            logger.error(f"Notification sending error: {str(e)}")
            return False

    def send_verification_approved(self, phone_number: str, user_name: str) -> bool:
        """Send verification approval notification."""
        message = f"سلام {user_name}،\nحساب کاربری شما در تالابین تایید شد. اکنون می‌توانید از تمام امکانات استفاده کنید."
        return self.send_notification(phone_number, message)

    def send_withdrawal_approved(self, phone_number: str, amount: int) -> bool:
        """Send withdrawal approval notification."""
        message = f"درخواست برداشت شما به مبلغ {amount:,} تومان تایید شد و طی 24 ساعت به حساب شما واریز می‌شود."
        return self.send_notification(phone_number, message)

    def send_deposit_approved(self, phone_number: str, amount: int) -> bool:
        """Send deposit approval notification."""
        message = f"واریز شما به مبلغ {amount:,} تومان تایید شد و به کیف پول شما اضافه شد."
        return self.send_notification(phone_number, message)


# Singleton instance
sms_service = SMSService()
