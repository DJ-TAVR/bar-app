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
    return 0

def calculate_cumulative_MLPP(list_of_shifts):
    return 0

def find_top3_shifts_MLPP(list_of_shifts):
    limit = min(3, len(list_of_shifts))
    dict = {}
    for shift in list_of_shifts:
        dict[shift.average_mlpp] = shift.average_mlpp / shift.target
    return sorted(nlargest(limit, dict, key=dict.get), reverse=True)


def calculate_over_pouring_percentage(list_of_shifts):
    over_pouring_shift_count = 0
    total_shifts_count = len(list_of_shifts)
    for shift in list_of_shifts:
        if (shift.average_mlpp / shift.target) > 1:
            over_pouring_shift_count += 1

    return (over_pouring_shift_count / total_shifts_count) * 100


def get_list_of_shifts(request):
    start_time = request.data['start_time']
    end_time = request.data['end_time']
    group = Group.objects.get(name='Bar Manager')
    user = request.user
    correct_bar = Bar.objects.get(manager=user)
    shifts = []
    filtered_shifts = []
    if group in user.groups.all():
        shifts = Shift.objects.filter(bar=correct_bar)
    for shift in shifts:
        if shift.start_time.strftime("%Y-%m-%d %H:%M:%S") >= start_time and shift.end_time.strftime(
                "%Y-%m-%d %H:%M:%S") <= end_time:
            filtered_shifts.append(shift)
    return filtered_shifts


# endpoint
@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def shifts_stats_view(request):
    user = request.user
    if check_bar_manager_access(user):
        if request.method == 'GET':
            # not sure what to put here
            return get_all_stickers(user)
        elif request.method == 'POST':
            try:
                list_of_shifts = get_list_of_shifts(request)

                # construct response
                stats = {}
                stats['average_mlpp'] = calculate_avg_MLPP(list_of_shifts)
                stats['cumulative_mlpp'] = calculate_cumulative_MLPP(list_of_shifts)
                stats['top3_MLPP'] = find_top3_shifts_MLPP(list_of_shifts)
                stats['over_pouring_percentage'] = calculate_over_pouring_percentage(list_of_shifts)
                print("this is stats,", stats)
                return Response(stats, status=200)
            except:
                return Response(None, status=400)
