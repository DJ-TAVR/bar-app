from django.contrib.auth.forms import UserCreationForm # built-in form for user of django
from django.contrib.auth.models import User
from django import forms

class CreateUserForm(UserCreationForm):
    role = forms.ChoiceField(choices=(('Bar Manager', 'Bar Manager'), ('Bartender', 'Bar Manager')))
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        exclude = ['role']
        