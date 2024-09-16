from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class Product(models.Model):
    name = models.CharField(
        verbose_name='Name',
        max_length=100
    )
    description = models.TextField()
    price_validator = MinValueValidator(limit_value=0)
    price = models.FloatField(
        verbose_name='Price',
        validators=[price_validator]
    )

    def __str__(self):
        return self.name