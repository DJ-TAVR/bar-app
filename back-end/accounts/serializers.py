from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Bartender

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email']

class BartenderSerializer(serializers.ModelSerializer):
    account = UserSerializer()
    class Meta:
        model = Bartender
        fields = ['account', 'id']