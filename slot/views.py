from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import AvailableSlotSerializer, ScheduledSlotSerializer, PrescriptionSerializer
from .models import AvailableSlot, ScheduledSlot, Prescription

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
            if role=='patient':
                queryset = ScheduledSlot.objects.filter(patient=user).all()
            elif role=='doctor':
                queryset = ScheduledSlot.objects.filter(doctor=user).all()
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = ScheduledSlotSerializer(queryset, many=True)
        
        elif model=='prescription':
            if role=='patient':
                queryset = ScheduledSlot.objects.filter(patient=user).all()
            elif role=='doctor':
                queryset = ScheduledSlot.objects.filter(doctor=user).all()
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = ScheduledSlotSerializer(queryset, many=True)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)        

        return Response(serializer.data, status=status.HTTP_200_OK)

