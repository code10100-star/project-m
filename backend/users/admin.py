from django.contrib import admin

# Register your models here.
from .models import Owner, Profile, Customer


admin.site.register(Profile)
admin.site.register(Owner)
admin.site.register(Customer)
