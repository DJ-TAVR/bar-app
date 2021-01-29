from django.shortcuts import render

# Create your views here.

# view that process sign in request
def sign_in_view(request):
    return render(request, 'base.html')

# view that process sign up request
def sign_up_view(request):
    pass

# view that process sign out request
def sign_out_view(request):
    pass