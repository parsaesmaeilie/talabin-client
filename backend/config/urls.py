"""
URL configuration for Talabin project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.http import JsonResponse

def api_root(request):
    """Root endpoint showing API status and available endpoints"""
    return JsonResponse({
        'status': 'ok',
        'message': 'Talabin API is running',
        'version': '1.0.0',
        'endpoints': {
            'documentation': '/api/docs/',
            'schema': '/api/schema/',
            'admin': '/admin/',
            'auth': '/api/auth/',
            'wallet': '/api/wallet/',
            'trading': '/api/trading/',
            'transactions': '/api/transactions/',
            'prices': '/api/prices/',
            'installments': '/api/installments/',
        }
    })

urlpatterns = [
    # Root endpoint
    path('', api_root, name='api-root'),

    # Admin
    path('admin/', admin.site.urls),

    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # API endpoints
    path('api/auth/', include('apps.accounts.urls')),
    path('api/wallet/', include('apps.wallet.urls')),
    path('api/trading/', include('apps.trading.urls')),
    path('api/transactions/', include('apps.transactions.urls')),
    path('api/prices/', include('apps.prices.urls')),
    path('api/installments/', include('apps.installments.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
