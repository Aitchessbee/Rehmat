from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

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
