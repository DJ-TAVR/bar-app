from django.db import models


# Create your models here.
class Bar(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=5)
    
