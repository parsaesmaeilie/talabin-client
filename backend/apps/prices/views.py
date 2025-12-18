"""
Views for prices app.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone
from datetime import timedelta

from .models import GoldPrice, PriceHistory
from .serializers import GoldPriceSerializer, PriceHistorySerializer


class GoldPriceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for gold prices."""

    queryset = GoldPrice.objects.all()
    serializer_class = GoldPriceSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current active gold price."""
        try:
            current_price = GoldPrice.objects.filter(is_active=True).latest('created_at')
            serializer = self.get_serializer(current_price)

            return Response({
                'success': True,
                'data': serializer.data
            })
        except GoldPrice.DoesNotExist:
            return Response({
                'success': False,
                'error': {'message': 'قیمت فعال یافت نشد'}
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def history(self, request):
        """Get price history for charts."""
        # Get timeframe from query params (default: 24h)
        timeframe = request.query_params.get('timeframe', '24h')

        # Calculate time delta
        if timeframe == '1h':
            delta = timedelta(hours=1)
        elif timeframe == '24h':
            delta = timedelta(days=1)
        elif timeframe == '7d':
            delta = timedelta(days=7)
        elif timeframe == '30d':
            delta = timedelta(days=30)
        else:
            delta = timedelta(days=1)

        # Get price history
        start_time = timezone.now() - delta
        history = PriceHistory.objects.filter(timestamp__gte=start_time)

        serializer = PriceHistorySerializer(history, many=True)

        return Response({
            'success': True,
            'data': serializer.data
        })
