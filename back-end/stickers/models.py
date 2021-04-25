from django.db import models
from django.contrib.auth.models import User
from inventory.models import Drink
# Create your models here.
class Bar(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=5)
    manager = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)

class Sticker(models.Model):
    drink = models.ForeignKey(Drink, related_name="stickers", on_delete=models.SET_NULL, null=True)
    sticker_id = models.CharField(max_length=50, blank=True, null=False, unique=True, primary_key=True)
    bar = models.ForeignKey(Bar, related_name='stickers', on_delete=models.SET_NULL, null=True)
    mlpp = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    target = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    @property
    def drink_name(self):
        return Drink.objects.get(self.drink).name
    @property
    def drink_size(self):
        return Drink.objects.get(self.drink).size
    @property
    def drink_type(self):
        return Drink.objects.get(self.drink).type
    @property
    def unit_price(self):
        return Drink.objects.get(self.drink).unit_price

class PouringInstance(models.Model):
    start_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True, auto_now_add=False, null=True, blank=True)
    volume_poured = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    sticker = models.ForeignKey(Sticker, related_name='pouring_instances', on_delete=models.DO_NOTHING, null=False)

class Shift(models.Model):
    bar = models.ForeignKey(Bar, related_name='shifts', on_delete=models.SET_NULL, null=True)
    # begin the shift
    start_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    target = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bartenders = models.ManyToManyField(User, related_name='shifts')
    # end shift
    end_time = models.DateTimeField(auto_now=True, auto_now_add=False, null=True, blank=True)
    average_mlpp = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True) # average mlpp from all stickers
    overpouring_count = models.IntegerField(blank=True, null=True) # increase any time the overpour signal sent from sticker

