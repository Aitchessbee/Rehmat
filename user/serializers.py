from rest_framework.serializers import ModelSerializer
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('last_login', 'is_active', 'is_staff', 'is_admin', 'is_superuser')
    
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
