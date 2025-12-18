"""
Base models that can be inherited by other models.
"""
from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """
    Abstract base model that includes created_at and updated_at fields.
    """
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ بروزرسانی')

    class Meta:
        abstract = True
        ordering = ['-created_at']


class SoftDeleteModel(models.Model):
    """
    Abstract base model that includes soft delete functionality.
    """
    is_deleted = models.BooleanField(default=False, verbose_name='حذف شده')
    deleted_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ حذف')

    class Meta:
        abstract = True

    def soft_delete(self):
        """Soft delete the object."""
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        """Restore a soft deleted object."""
        self.is_deleted = False
        self.deleted_at = None
        self.save()
