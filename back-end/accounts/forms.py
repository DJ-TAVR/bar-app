from django.contrib.auth.forms import UserCreationForm # built-in form for user of django
from django.contrib.auth.models import User

class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        