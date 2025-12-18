"""
Views for transactions app.
"""
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import models

from .models import Transaction
from .serializers import TransactionSerializer


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for transaction history."""

    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return current user's transactions."""
        queryset = Transaction.objects.filter(user=self.request.user)

        # Filter by type if provided
        transaction_type = self.request.query_params.get('type')
        if transaction_type:
            queryset = queryset.filter(transaction_type=transaction_type)

        # Filter by status if provided
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def list(self, request, *args, **kwargs):
        """List all transactions."""
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                'success': True,
                'data': serializer.data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'data': serializer.data
        })

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get transaction summary statistics."""
        transactions = self.get_queryset()

        # Calculate totals
        total_deposits = transactions.filter(
            transaction_type='deposit',
            status='completed'
        ).aggregate(total=models.Sum('amount_irr'))['total'] or 0

        total_withdrawals = transactions.filter(
            transaction_type='withdraw',
            status='completed'
        ).aggregate(total=models.Sum('amount_irr'))['total'] or 0

        total_buys = transactions.filter(
            transaction_type='buy',
            status='completed'
        ).aggregate(total=models.Sum('amount_irr'))['total'] or 0

        total_sells = transactions.filter(
            transaction_type='sell',
            status='completed'
        ).aggregate(total=models.Sum('amount_irr'))['total'] or 0

        return Response({
            'success': True,
            'data': {
                'total_deposits': total_deposits,
                'total_withdrawals': total_withdrawals,
                'total_buys': total_buys,
                'total_sells': total_sells,
                'total_transactions': transactions.count()
            }
        })
