from django.db import models
from django.forms import ModelForm
from .models import Sticker
from django import forms

class StickerForm(ModelForm):
    class Meta:
        model = Sticker
        fields = ['sticker_id', 'drink_name','drink_type','drink_size','price',]