from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('sign_in', views.sign_in_view, name='sign_in_view'),
    path('sign_out', views.sign_out_view, name='sign_out_view'),
    path('sign_up/', views.sign_up_view, name='sign_up_view'),
    path('', views.sign_in_view)
]