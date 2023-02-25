from rest_framework import serializers
from .models import AvailableSlot, ScheduledSlot, Prescription


class AvailableSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableSlot
        fields = '__all__'


class ScheduledSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledSlot
        fields = '__all__'


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'
