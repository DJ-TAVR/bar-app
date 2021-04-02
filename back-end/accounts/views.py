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
from stickers.models import Bar
from .serializers import BartenderSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Bartender
from django.core.mail import send_mail
# Create your views here.
### API using DRF
@api_view(['POST'])
def login_view(request):
    username = request.data['username']
    password = request.data['password']

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    print(list(user.groups.all().values('name')))
    return JsonResponse({'role': list(user.groups.all().values('name'))})

@api_view(['POST'])
def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})

# Bartender 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_bartender_view(request):
    # extract data from request
    first_name = request.data['first_name']
    last_name = request.data['last_name']
    email = request.data['email']
    bar_manager = request.user

    # check permission
    check_bar_manager_access(bar_manager)
    # check valid email
    if not User.objects.filter(email=email).exists():
        # generate username
        username = generate_username(first_name, last_name)
        # generate password
        password = User.objects.make_random_password()
        # create user
        user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name)
        group = Group.objects.get(name="Bartender")
        user.groups.add(group)
        user.save()
        current_bar = Bar.objects.get(manager=bar_manager)
        bartender = Bartender(account=user, manager=bar_manager, work_at=current_bar)
        bartender.save()
        # send mail
        message = "Your username is " + username + " and your password is " + password
        send_mail(
            'BARIQ - Account information',
            message,
            'bariq.dev@gmail.com',
            [email],
            fail_silently=False,
        )
        return Response({"id": bartender.id}, status=200)
    return Response({"message_error": "email already exist"}, status=400)

@api_view(['POST'])
def update_bartender_view(request):
    new_first_name = request.data['first_name']
    new_last_name = request.data['last_name']
    new_email = request.data['email']
    id = request.data['id']
    try:
        username = Bartender.objects.get(id=id).account
        user = User.objects.get(username=username)
        user.first_name = new_first_name
        user.last_name = new_last_name
        user.email = new_email
        user.save()
        return Response(status=200)
    except:
        return Response({'message_error': 'id does not exist'},status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bartenders_view(request):
    current_bar = Bar.objects.filter(manager=request.user)
    bartenders = Bartender.objects.filter(work_at=current_bar.first().id)
    serialized_bartenders = BartenderSerializer(bartenders, many=True)
    return Response(serialized_bartenders.data, status=200)

@api_view(['POST'])
def delete_bartender_view(request):
    id = request.data['id']
    try:
        bartender = Bartender.objects.get(id=id)
        username = bartender.account
        user = User.objects.get(username=username)
        user.delete()
        return Response(status=200)
    except:
        return Response({'message_error': 'id does not exist'},status=400)

# bartender - helper functions
def generate_username(first_name, last_name):
    username = first_name + last_name
    user_qs = User.objects.filter(username=username)
    while user_qs.exists():
        number = random.randint(1, 100)
        username += str(number)  
        user_qs = User.objects.filter(username=username)
    return username

def check_bar_manager_access(user):
    group = Group.objects.get(name='Bar Manager')
    if group in user.groups.all():
        return True
    else:
        return JsonResponse({'detail': 'Insufficient privilege.'}, status=400)

# ##### Pure django
# from . import forms
# # view that process sign in request
# def sign_in_view(request):
#     # if request method is POST perform authentication
#     if request.method == 'POST':
#         # get data from submitted form
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         # authenticate credential
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return render(request, 'index.html')

#     return render(request, 'accounts/sign_in.html')

# # view that process sign up request
# def sign_up_view(request):
#     form = forms.CreateUserForm()
#     # if request method is POST create new account 
#     if request.method == 'POST':
#         form = forms.CreateUserForm(request.POST) # create form object from submitted form
#         group_name = form.data['role']
#         if form.is_valid():
#             user = form.save()
#             # below code user to a group (bartender or bar manager)
#             group = Group.objects.get(name=group_name)
#             user.groups.add(group)

#             messages.success(request, 'Account is created for' + form.cleaned_data.get('username'))
#             return redirect('sign_in_view')

#     context = {'form': form} # send object form to template
#     return render(request, 'accounts/sign_up.html', context)

# # view that process sign out request
# def sign_out_view(request):
#     logout(request)
#     return redirect('sign_in_view')