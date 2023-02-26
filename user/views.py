from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from django.shortcuts import render
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.files import File

from .serializers import UserSerializer
from .refugee_validate import validate
from .models import ValidationImage, User

import os

# Create your views here.


class Register(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        data = request.data.copy()

        if data['role']=='RF':
            image_id = data['image_id']
            image_instance = ValidationImage.objects.filter(id=image_id).first()
            with open(os.path.join(settings.MEDIA_ROOT, image_instance.image_name), mode='rb') as f:
                data['id_proof'] = File(f, name=image_instance.image_name)

        serializer = UserSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


class ValidateRefugee(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.data.get('id_proof')
        file_name = f'validate/{file.name}'
        file_name = default_storage.save(file_name, file)
        # try:
        list = validate(file_name)
        # except:
        #     return Response({'error': 'Invalid ID card'}, status=status.HTTP_400_BAD_REQUEST)
        if list[0]=='Invalid':
            return Response({'error': 'Invalid ID card'}, status=status.HTTP_400_BAD_REQUEST)
        instance = ValidationImage(image_name=file_name)
        instance.save()
        instance = ValidationImage.objects.filter(image_name=file_name).first()
        return Response({
            'id': instance.id,
            'unhrc_number': list[1],
            'name': list[2],
            'date_of_birth': list[3],
            'country': list[4]
        }, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user is None or (user.role=='DR' and not user.is_verified_doctor):
            return Response({'error': 'Invalid Credentials!'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = Token.objects.get(user=user)
            token.delete()
        except:
            pass

        token = Token.objects.get_or_create(user=user)
        return Response({
            'token': token[0].key,
            'name': user.name,
            'role': user.role
        }, status=status.HTTP_200_OK)        
