from rest_framework import serializers
from .models import Sticker
from inventory.models import Drink

class StickerSerializer(serializers.ModelSerializer):
    drink_name = serializers.SerializerMethodField(source='get_drink_name')
    drink_type = serializers.SerializerMethodField(source='get_drink_type')
    drink_size = serializers.SerializerMethodField(source='get_drink_size')
    drink_price = serializers.SerializerMethodField(source='get_drink_price')

    class Meta:
        model = Sticker
        fields = ['drink_name','drink_type','drink_size','drink_price', 'drink_id','sticker_id', 'bar', 'mlpp', 'target',]
        read_only_fields = ['bar',]

    def get_drink_name(self, obj):
        return obj.drink.name
    def get_drink_type(self, obj):
        if obj is None: return
        return obj.drink.type
    def get_drink_size(self, obj):
        if obj is None: return
        return obj.drink.size
    def get_drink_price(self, obj):
        if obj is None: return
        return obj.drink.price

