from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate

from .serializers import UserSerializer

# Create your views here.


class Register(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        data = request.data.copy()
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
