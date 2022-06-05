from email import message
from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
# from backend.users import serializers
from users.models import Profile, Customer, Owner
from users.serializers import ProfileSerializer, UserSerializer, GroupSerializer, CustomerSerializer, OwnerSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
from rest_framework.authentication import TokenAuthentication

from .forms import CustomUserCreationForm



# @api_view(['GET'])
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# @api_view(['GET'])
# class ProfileViewSet(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def getProfiles(request):
    Profiles = Profile.objects.all()
    serializer = ProfileSerializer(Profiles,many = True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getProfile(request,pk):
    profile = Profile.objects.get(id=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {'GET': '/api/profiles'},
        {'GET': '/api/profile/id'},

        # {'POST': '/api/users/token'},
        # {'POST': '/api/users/token/refresh'},
    ]
    return Response(routes)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }
    return Response(content)

@api_view(['POST'])
def registerUser(request):
    page = 'register'
    form = CustomUserCreationForm()
    # print(request)
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        # print(request.POST['Name'])
        # print(request.POST['email'])
        # print(request.POST['username'])
        # print(request.POST['password1'])
        # print(request.POST['password2'])

        if form.is_valid():
            # print('print something')
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()

            messages.success(request, 'User account was created!')

            return Response('User account was created!')

        else:
            messages.error(request, 'An error has occurred during registration')
            
    return Response('An error has occurred during registration')

@api_view(['GET'])
def getCustomers(request,pk):
    customers = Customer.objects.filter(owner=pk)
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOwners(request):
    owners = Owner.objects.all()
    serializer = OwnerSerializer(owners, many=True)
    return Response(serializer.data)

