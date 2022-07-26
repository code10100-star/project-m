from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from users.models import Owner, Profile, Customer, orderDetails


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'

#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
  name = serializers.CharField(write_only=True, required=True)
  email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
  password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  class Meta:
    model = User
    fields = ('username', 'password1', 'password2', 'email', 'name')

    extra_kwargs = {
      'name': {'required': True},
    }
  def validate(self, attrs):
    if attrs['password1'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['name'],
    )
    user.set_password(validated_data['password1'])
    user.save()
    return user

class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = orderDetails
        fields = '__all__'