from rest_framework import serializers
from .models import Sticker

class StickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = ['drink','sticker_id', 'bar', 'mlpp', 'target']
        read_only_fields = ['bar',]

