from django.shortcuts import render, redirect
from django.contrib.auth.models import Group
from . import forms
from django.contrib.auth import login, authenticate, logout


# Create your views here.

# view that process sign in request
def sign_in_view(request):
    # if request method is POST perform authentication
    if request.method == 'POST':
        # get data from submitted form
        username = request.POST.get('username')
        password = request.POST.get('password')

        # authenticate credential
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request, 'index.html')

    return render(request, 'accounts/sign_in.html')

# view that process sign up request
def sign_up_view(request):
    form = forms.CreateUserForm()
    # if request method is POST create new account 
    if request.method == 'POST':
        user = form.save()

        # below code user to a group (bartender or bar manager)
        # group = Group.objects.get(name='')
        # user.groups.add(group)

        messages.success(request, 'Account is created for' + form.cleaned_data.get('username'))
        return redirect('sign_in_view')

    context = {'form': form} # send object form to template
    return render(request, 'accounts/sign_up.html', context)

# view that process sign out request
def sign_out_view(request):
    logout(request)
    return redirect('sign_in_view')