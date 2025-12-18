"""
URL configuration for prices app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GoldPriceViewSet

router = DefaultRouter()
router.register(r'gold', GoldPriceViewSet, basename='gold-price')

urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),
]
