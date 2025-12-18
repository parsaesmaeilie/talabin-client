"""
URL configuration for accounts app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import AuthViewSet, UserViewSet, UserAddressViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'addresses', UserAddressViewSet, basename='address')

urlpatterns = [
    # Authentication endpoints
    path('register/', AuthViewSet.as_view({'post': 'register'}), name='register'),
    path('login/', AuthViewSet.as_view({'post': 'login'}), name='login'),
    path('logout/', AuthViewSet.as_view({'post': 'logout'}), name='logout'),
    path('send-otp/', AuthViewSet.as_view({'post': 'send_otp'}), name='send-otp'),
    path('verify-otp/', AuthViewSet.as_view({'post': 'verify_otp'}), name='verify-otp'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # User profile endpoints
    path('me/', UserViewSet.as_view({'get': 'me'}), name='user-me'),
    path('profile/update/', UserViewSet.as_view({'put': 'update_profile', 'patch': 'update_profile'}), name='update-profile'),
    path('profile/change-password/', UserViewSet.as_view({'post': 'change_password'}), name='change-password'),
    path('profile/verification/', UserViewSet.as_view({'post': 'submit_verification'}), name='submit-verification'),

    # Include router URLs
    path('', include(router.urls)),
]
