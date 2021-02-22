from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.get_stickers_view, name='api-get-stickers'),
    path('create/', views.create_sticker_view, name='api-create-stickers'),
]