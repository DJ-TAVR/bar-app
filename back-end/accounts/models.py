from django.db import models
from django.contrib.auth.models import User
from stickers.models import Bar
class Bartender(models.Model):
    account = models.OneToOneField(User, on_delete=models.CASCADE)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='bartenders')
    work_at = models.ForeignKey(Bar, on_delete=models.CASCADE)