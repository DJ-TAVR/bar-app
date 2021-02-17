from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Bar(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=5)
    manager = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)

class Sticker(models.Model):
    drink_name = models.CharField(max_length=50, blank=True, null=True)
    drink_type = models.CharField(max_length=50, blank=True, null=True)
    drink_size = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bar = models.ForeignKey(Bar, related_name='stickers', on_delete=models.SET_NULL, null=True)
