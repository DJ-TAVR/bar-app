from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Bar(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=5)
    manager = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)

class Sticker(models.Model):
    sticker_id = models.CharField(max_length=50, blank=True, null=False, unique=True, primary_key=True)
    drink_name = models.CharField(max_length=50, blank=True, null=True)
    drink_type = models.CharField(max_length=50, blank=True, null=True)
    drink_size = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bar = models.ForeignKey(Bar, related_name='stickers', on_delete=models.SET_NULL, null=True)
    mlpp = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

class Shift(models.Model):
    bar = models.ForeignKey(Bar, related_name='shifts', on_delete=models.SET_NULL, null=True)
    start_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True, auto_now_add=False, null=True, blank=True)
    total_mlpp = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    average_mlpp = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    target = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

