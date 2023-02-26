from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.shortcuts import render

from .serializers import AvailableSlotSerializer, ScheduledSlotSerializer, PrescriptionSerializer
from .models import AvailableSlot, ScheduledSlot, Prescription

from .permissions import IsDoctor, IsRefugee
from .models import ScheduledSlot

from datetime import datetime

# Create your views here.


class SlotView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, model, role):
        user = request.user

        if model=='available':
            if not user.is_verified_doctor or user.role!='DR':
                return Response(status=status.HTTP_400_BAD_REQUEST)
            queryset = AvailableSlot.objects.filter(doctor=user).all()
            serializer = AvailableSlotSerializer(queryset, many=True)

        elif model=='scheduled':
            if role=='refugee':
                queryset = ScheduledSlot.objects.filter(patient=user).all()
            elif role=='doctor':
                queryset = ScheduledSlot.objects.filter(doctor=user).all()
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = ScheduledSlotSerializer(queryset, many=True)
        
        elif model=='prescription':
            if role=='refugee':
                queryset = Prescription.objects.filter(patient=user).all()
            elif role=='doctor':
                queryset = Prescription.objects.filter(doctor=user).all()
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = ScheduledSlotSerializer(queryset, many=True)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)        

        return Response(serializer.data, status=status.HTTP_200_OK)


class AvailableDoctorSlots(APIView):
    permission_classes = [IsAuthenticated&IsRefugee]

    def get(self, request):
        queryset = AvailableSlot.objects.distinct('time')
        
        data = {}
        for item in queryset:
            key = item.time.date()
            if len(data[key]):
                data[key].append([item.time.time()])
            else:
                data[key] = [item.time.time()]
        
        return Response(data, status=status.HTTP_200_OK)


class DoctorFreeSlotAdd(APIView):
    permission_classes = [IsAuthenticated&IsDoctor]

    def post(self, request):
        user = request.user

        if not user.is_verified_doctor or user.role!='DR':
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        date = request.data.get('date')
        time = request.data.get('time')

        instance = AvailableSlot(doctor=user, time=datetime.strptime(f"{date}_{time}", "YYYY-MM-DD_HH:mm:SS"))
        instance.save()

        return Response(status=status.HTTP_201_CREATED)


class PatientFinaliseSlot(APIView):
    permission_classes = [IsAuthenticated&IsRefugee]

    def post(self, request):
        date = request.data.get('date')
        time = request.data.get('time')
        
        free_slot_instance = AvailableSlot.objects.filter(time=datetime.strftime(f"{date}_{time}", "YYYY-MM-DD_HH:mm:SS")).first()
        if free_slot_instance is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        instance = ScheduledSlot(doctor=free_slot_instance.doctor, time=free_slot_instance.time, patient=request.user)
        instance.save()

        free_slot_instance.delete()

        return Response(status=status.HTTP_201_CREATED)


class SlotPatientAllPrescriptions(APIView):
    permission_classes = [IsAuthenticated&IsDoctor]

    def get(self, request, id):
        slot = ScheduledSlot.objects.filter(id=id).first()
        if slot is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        prescription_queryset = Prescription.objects.filter(patient=slot.patient).all()
        serializer = PrescriptionSerializer(prescription_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancelScheduledSlot(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = request.data.get('id')
        instance = ScheduledSlot.objects.filter(id=id).first()

        if instance is None or (instance.patient!=request.user and instance.doctor!=request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance.delete()
        return Response(status=status.HTTP_200_OK)


class CancelDoctorFreeSlot(APIView):
    permission_classes = [IsAuthenticated&IsRefugee]

    def post(self, request):
        id = request.data.get('id')
        instance = AvailableSlot.objects.filter(id=id).first()

        if instance is None or instance.doctor!=request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance.delete()
        return Response(status=status.HTTP_200_OK)


class MeetingToken(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        instance = ScheduledSlot.objects.filter(id=id).first()

        if instance is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'id': instance.id,
            'doctor': instance.doctor.name,
            'patient': instance.patient.name,
            'time': instance.time,
            'token': instance.token,
            'channel': instance.channel
        }, status=status.HTTP_200_OK)


def callView(request, id):
    slot = ScheduledSlot.objects.filter(id=id).first()
    if slot.token=='':
        return HttpResponse('Invalid ID')
    
    token = slot.token
    channel = slot.channel

    return render(request, 'slot/index.html', context={'token': token, 'channel': channel})
