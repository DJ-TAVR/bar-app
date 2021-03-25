from django.shortcuts import render, redirect
from django.contrib.auth.models import Group
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view 

# Create your views here.
### API using DRF
@api_view(['POST'])
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})

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
def create_bartender_view(request):
    pass

@api_view(['POST'])
def update_bartender_view(request):
    pass

@api_view(['GET'])
def get_bartenders_view(request):
    pass

@api_view(['POST'])
def delete_bartender_view(request):
    pass







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