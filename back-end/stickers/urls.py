from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.get_stickers_view, name='api-get-stickers'),
    path('create/', views.create_sticker_view, name='api-create-stickers'),
    path('delete/', views.delete_sticker_view, name='api-delete-stickers'),
    path('update/', views.update_sticker_view, name = 'api-update-stickers'),
    path('shifts_stats/', views.shifts_stats_view, name= 'api-shifts-stats'),
    path('get_shifts/', views.get_shifts_view, name= 'api-shifts-stats'),
    path('revenue_results/', views.calculate_revenue_from_pouring_instances_view, name= 'api-revenue-results'),
    path('overpoured_drinks/', views.get_five_most_overpoured_drinks_view, name = 'api-overpoured-drinks'),
]
