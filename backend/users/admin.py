from django.contrib import admin

# Register your models here.
from .models import Owner, Profile


admin.site.register(Profile)
admin.site.register(Owner)
