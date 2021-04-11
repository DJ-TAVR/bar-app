from django.db import models
from django.contrib.auth.models import User
# # Create your models here.
class Drink(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    @property
    def unit_price(self):
        return 0 if self.size == 0 else self.price/self.size
