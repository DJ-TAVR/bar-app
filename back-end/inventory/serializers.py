from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Drink

class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = '__all__'

