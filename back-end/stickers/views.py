from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth.models import Group
from .models import Sticker, Bar
from .serializers import StickerSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import redirect
import json
from .forms import StickerForm
from rest_framework.permissions import IsAuthenticated

# Stickers 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stickers_view(request):
    return get_all_stickers(request.user)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def create_sticker_view(request):
    user = request.user
    if check_bar_manager_access(user):
        if request.method == 'GET':
            return get_all_stickers(user)
        elif request.method == 'POST':
            correct_bar = Bar.objects.get(manager=user)
            serializer = StickerSerializer(data=request.data)
            if serializer.is_valid():
                instance = serializer.save(bar=correct_bar)
                instance.save()
                return JsonResponse({'detail': 'Successfully created stickers'}, status = 200)
            else:
                return JsonResponse({'detail': 'Failed to create new sticker.'}, status = 400)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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

# stat
## helper functions
def calculate_avg_MLPP(list_of_shifts):
    totalNumShifts = 0
    totalAvgMLPP = 0
    for shift in list_of_shifts:
        totalNumShifts += 1
        totalAvgMLPP += shift.average_mlpp
    return totalAvgMLPP/totalNumShifts

def calculate_cumulative_MLPP(list_of_shifts):
    totalNumShifts = 0
    totalCumulativeMLPP = 0
    for shift in list_of_shifts:
        totalNumShifts += 1
        totalCumulativeMLPP += shift.cumulative_mlpp
    return totalCumulativeMLPP/totalNumShifts

def find_top3_shifts_MLPP(list_of_shifts):
    return 0

def calculate_over_pouring_percentage(list_of_shifts):
    return 0

def get_list_of_shifts(start_time, end_time):
    # query shifts in between start-end
    return []

## endpoint
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shifts_stats_view(request):
    try:
        # get input from request and database
        start_time = request.data['start_time']
        end_time = request.data['end_time']
        list_of_shifts = get_list_of_shifts(start_time, end_time)

        # construct response 
        stats = {}
        stats['average_mlpp'] = calculate_avg_MLPP(list_of_shifts)
        stats['cumulative_mlpp'] = calculate_cumulative_MLPP(list_of_shifts)
        stats['top3_MLPP'] = find_top3_shifts_MLPP(list_of_shifts)
        stats['over_pouring_percentage'] = calculate_over_pouring_percentage(list_of_shifts)
        return Response(stats, status=200)
    except:
        return Response(None, status=400)