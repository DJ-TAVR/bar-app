from django.shortcuts import render, redirect
from django.contrib.auth.models import Group
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
import random
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Drink
from .serializers import DrinkSerializer
from django.db.models import Min
# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_drinks(request):
    drinks = Drink.objects.all()
    serialized_drinks = DrinkSerializer(drinks, many=True)
    return Response(serialized_drinks.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_drink_with_lowest_quantity(request):
    min_quantity = Drink.objects.aggregate(min=Min('quantity'))['min']
    drinks = Drink.objects.filter(quantity=min_quantity)
    serialized_drinks = DrinkSerializer(drinks, many=True)
    return Response(serialized_drinks.data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_drink_with_quantity_range(request):
    max_quantity = request.data['max_quantity']
    min_quantity = request.data['min_quantity']
    drinks = Drink.objects.filter(quantity__range=(min_quantity, max_quantity))
    serialized_drinks = DrinkSerializer(drinks, many=True)
    return Response(serialized_drinks.data, status=200)