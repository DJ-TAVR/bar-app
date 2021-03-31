from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('create_bartender/', views.create_bartender_view, name='api-create-bartender'),
    path('update_bartender/', views.update_bartender_view, name='api-update-bartender'),
    path('delete_bartender/', views.delete_bartender_view, name='api-delete-bartender'),
    path('get_bartenders/', views.get_bartenders_view, name='api-get-bartenders'),
]