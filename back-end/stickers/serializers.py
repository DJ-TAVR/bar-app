from rest_framework import serializers
from .models import Sticker

class StickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = ['sticker_id','drink_name', 'drink_type', 'drink_size', 'price', 'bar']