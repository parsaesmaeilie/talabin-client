"""
URL configuration for trading app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),
]
