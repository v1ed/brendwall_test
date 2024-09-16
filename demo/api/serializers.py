from rest_framework import serializers

from core.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'price',
            'description',
        ]
    
    def create(self, validated_data):
        product = Product.objects.create(**validated_data)
        return product


    