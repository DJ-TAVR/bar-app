# Generated by Django 3.1.6 on 2021-03-13 23:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=100)),
                ('zip_code', models.CharField(max_length=5)),
                ('manager', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Sticker',
            fields=[
                ('sticker_id', models.CharField(blank=True, max_length=50, primary_key=True, serialize=False, unique=True)),
                ('drink_name', models.CharField(blank=True, max_length=50, null=True)),
                ('drink_type', models.CharField(blank=True, max_length=50, null=True)),
                ('drink_size', models.CharField(blank=True, max_length=50, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('mlpp', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('bar', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='stickers', to='stickers.bar')),
            ],
        ),
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField(auto_now_add=True)),
                ('end_time', models.DateTimeField(auto_now=True, null=True)),
                ('total_mlpp', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('average_mlpp', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('target', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('bar', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='shifts', to='stickers.bar')),
                ('bartenders', models.ManyToManyField(related_name='bartenders', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
