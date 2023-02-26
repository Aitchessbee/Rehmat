from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager

# Create your models here.

DESIGNATION_CHOICES = [
    ['RF', 'Refugee'],
    ['DR', 'Doctor']
]

def id_upload_to(instance, filename):
    return f'uploads/{instance.role}/{filename}'


class User(AbstractBaseUser):

    email = models.EmailField(max_length=256, primary_key=True)

    name = models.CharField(max_length=256)
    phone_number = models.CharField(max_length=32)
    date_of_birth = models.DateField(auto_now_add=False, auto_now=False)
    city = models.CharField(max_length=128)
    country = models.CharField(max_length=128)
    gender = models.CharField(max_length=32, default='')
    id_proof = models.ImageField(upload_to=id_upload_to)

    role = models.CharField(max_length=2, choices=DESIGNATION_CHOICES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    is_verified_doctor = models.BooleanField(default=False)

    unhrc_number = models.CharField(max_length=128, default='')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone_number', 'date_of_birth', 'city', 'country']

    def get_short_name(self):
        return self.name.split(' ')[0]

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, perm, obj=None):
        return True

    def __str__(self):
        return self.email
    

class ValidationImage(models.Model):
    image_name = models.CharField(max_length=2500)

    def __str__(self):
        return str(self.id)
