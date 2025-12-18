"""
URL configuration for wallet app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WalletViewSet, BankAccountViewSet, DepositViewSet, WithdrawalViewSet

router = DefaultRouter()
router.register(r'bank-accounts', BankAccountViewSet, basename='bank-account')
router.register(r'deposits', DepositViewSet, basename='deposit')
router.register(r'withdrawals', WithdrawalViewSet, basename='withdrawal')

urlpatterns = [
    # Wallet endpoints
    path('balance/', WalletViewSet.as_view({'get': 'balance'}), name='wallet-balance'),
    path('transactions/', WalletViewSet.as_view({'get': 'transactions'}), name='wallet-transactions'),

    # Include router URLs
    path('', include(router.urls)),
]
