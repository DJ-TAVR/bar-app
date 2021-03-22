from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.get_stickers_view, name='api-get-stickers'),
    path('create/', views.create_sticker_view, name='api-create-stickers'),
    path('delete/', views.delete_sticker_view, name='api-delete-stickers'),
    path('update/', views.update_sticker_view, name = 'api-update-stickers'),
    path('shifts_stats/', views.shifts_stats_view, name= 'api-shifts-stats')
]
