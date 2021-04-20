from django.contrib import admin
from .models import Sticker, Bar, Shift, PouringInstance

# Register your models here.
admin.site.register(Sticker)
admin.site.register(Bar)
admin.site.register(Shift)
admin.site.register(PouringInstance)