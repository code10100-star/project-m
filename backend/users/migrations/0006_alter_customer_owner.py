# Generated by Django 4.0.4 on 2022-06-07 11:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_orderdetails_customer_orderdetails_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.owner'),
        ),
    ]
