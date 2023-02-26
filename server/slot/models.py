from django.db import models
from user.models import User

# Create your models here.


class AvailableSlot(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='available_slot')
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.doctor}_{self.time}"


class ScheduledSlot(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_slot')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_slot')
    time = models.DateTimeField()

    token1 = models.CharField(max_length=2500, default='', blank=True)
    token2 = models.CharField(max_length=2500, default='', blank=True)
    channel = models.CharField(max_length=1500, default='', blank=True)
    uid1 = models.CharField(max_length=1500, default='', blank=True)
    uid2 = models.CharField(max_length=1500, default='', blank=True)

    def __str__(self):
        return f"{self.patient}_{self.doctor}_{self.time}"


class Prescription(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_prescription')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_prescription')
    time = models.DateTimeField()
    text = models.TextField()

    def __str__(self):
        return f"{self.patient}_{self.doctor}_{self.time}"
