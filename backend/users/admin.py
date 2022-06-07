from django.contrib import admin

# Register your models here.
from .models import Owner, Profile, Customer,Susbscription,orderDetails


admin.site.register(Profile)
admin.site.register(Owner)
admin.site.register(Customer)
admin.site.register(Susbscription)
admin.site.register(orderDetails)
