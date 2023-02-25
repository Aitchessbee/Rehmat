from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User

# Register your models here.


class UserModel(admin.ModelAdmin):
    list_display = ('email', 'name', 'role', 'phone_number', 'date_of_birth', 'city', 'country', 'id_proof')
    list_filter = ('role', )
    search_fields = ('name', 'email', 'phone_number', 'city', 'country')
    list_display_links = ('email', )


admin.site.register(User, UserModel)
admin.site.unregister(Group)
