from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('get_drinks/', views.get_drinks, name='api-get-drink'),
    path('get_drink_lowest_stock/', views.get_drink_with_lowest_quantity, name='api-get-drink-lowest-stock'),
    path('get_drink_with_quantity_range/', views.get_drink_with_quantity_range, name='api-get-drink-with-quantity-range'),
]