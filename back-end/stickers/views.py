from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth.models import Group
from .models import Sticker, Bar
from .serializers import StickerSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import redirect
import json
from .forms import StickerForm

# Create your views here.
@api_view(['GET'])
def get_stickers_view(request):
    return get_all_stickers(request.user)

@api_view(['GET', 'POST'])
def create_sticker_view(request):
    user = request.user
    if check_bar_manager_access(user):
        if request.method == 'GET':
            return get_all_stickers(user)
        elif request.method == 'POST':
            form = StickerForm(request.data)
            correct_bar = Bar.objects.get(manager = user)
            if form.is_valid():
                sticker_instance = form.save(commit=False)
                sticker_instance.bar = correct_bar
                sticker_instance.save()
                form.save()
                return JsonResponse({'detail': 'Successfully created stickers'}, status = 200)
            else:
                return JsonResponse({'detail': 'Failed to create new sticker.'}, status = 400)

@api_view(['GET', 'PUT'])
def update_sticker_view(request):
    user = request.user
    if check_bar_manager_access(user):
        if request.method == 'GET':
            return get_all_stickers(user)
        elif request.method == 'PUT':
            instance = Sticker.objects.values('sticker_id')
            stickerInTable = 0
            for i in range(len(instance)):
                if instance[i]['sticker_id'] == request.data['sticker_id']:
                    stickerInTable = 1
            if stickerInTable == 1:
                object_to_update = Sticker.objects.get(pk = request.data['sticker_id'])
                object_to_update.drink_name = request.data['drink_name']
                object_to_update.drink_type = request.data['drink_type']
                object_to_update.drink_size = request.data['drink_size']
                object_to_update.price = request.data['price']
                object_to_update.save()

                return JsonResponse({'detail': 'Successfully Updated Sticker!'}, status = 200)
            else:
                return JsonResponse({'detail': 'Failed to Update Sticker'}, status = 400)
        
    

@api_view(['GET', 'POST'])
def delete_sticker_view(request):
    user = request.user
    if check_bar_manager_access(user):
        if request.method == 'GET':
            return get_all_stickers(user)
        elif request.method == 'POST':
            try:
                currSticker = request.data["sticker_id"]
                object_to_delete = Sticker.objects.get(pk = currSticker)
                object_to_delete.delete()
                return JsonResponse({'detail': 'Successfully Deleted Sticker!'}, status = 200)
            except:
                return JsonResponse({'detail': 'Failed to Delete Sticker'}, status = 400)


def get_all_stickers(user):
    group = Group.objects.get(name='Bar Manager')
    correct_bar = Bar.objects.get(manager = user)
    if group in user.groups.all():
        stickers = Sticker.objects.filter(bar=correct_bar)
        serialized_stickers = StickerSerializer(stickers, many = True)
        return Response(serialized_stickers.data, status=200)
    else:
        return JsonResponse({'detail': 'Insufficient privilege.'}, status = 400)



def check_bar_manager_access(user):
    group = Group.objects.get(name='Bar Manager')
    if group in user.groups.all():
        return True
    else:
        return JsonResponse({'detail': 'Insufficient privilege.'}, status = 400)

