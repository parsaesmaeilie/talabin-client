"""
URL configuration for installments app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstallmentPlanViewSet, InstallmentViewSet

router = DefaultRouter()
router.register(r'plans', InstallmentPlanViewSet, basename='installment-plan')
router.register(r'subscriptions', InstallmentViewSet, basename='installment')

urlpatterns = [
    path('', include(router.urls)),
]
