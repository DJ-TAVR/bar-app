from django.shortcuts import render
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def get_stickers_view(request):
    pass

@api_view(['POST'])
def create_sticker_view(request):
    pass

@api_view(['PUT'])
def update_sticker_view(request):
    pass

@api_view(['DELETE'])
def delete_sticker_view(request):
    pass

