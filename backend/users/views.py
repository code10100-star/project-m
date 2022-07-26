# from asyncio.windows_events import NULL
# from asyncio.windows_events import NULL
from email import message
import string
from urllib import response
from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions,status
# from backend.users import serializers
from users.models import Profile, Customer, Owner, orderDetails
from users.serializers import ProfileSerializer, UserSerializer, GroupSerializer, CustomerSerializer, OwnerSerializer, RegisterSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .forms import CustomUserCreationForm
import json
# import status


# @api_view(['GET'])
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


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
# @permission_classes([IsAuthenticated])
def getProfile(request,pk):
    profile = Profile.objects.get(id=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {'GET': '/api/profiles'},
        {'GET': '/api/profile/id'},
        {'GET': '/api/customers/id'},
        {'GET': '/api/owners/'},
        {'GET': '/api/resgister/'},
        {'GET': '/api/auth/'},

        # {'POST': '/api/users/token'},
        # {'POST': '/api/users/token/refresh'},
    ]
    return Response(routes)

@api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def example_view(request, format=None):

    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }

    return Response(content)

@api_view(['POST'])
def registerUser(request):
    data = request.body
    data = json.loads(data.decode("utf-8"))
    role = data['Role']
    data.pop("Role")

    serializer = RegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=data['username'])
        data.pop("password1")
        data.pop("password2")
        data['user']= user.id
        if(role == 'Customer'):
            serializer2 = CustomerSerializer(data = data)
            if(serializer2.is_valid()):
                serializer2.save()
                return Response('Successfully registered',status=status.HTTP_201_CREATED)
            else:
                print(serializer2.errors)
                Response(serializer2.errors,status=status.HTTP_400_BAD_REQUEST)
        elif role=="Owner":
            serializer2 = OwnerSerializer(data = data)
            if(serializer2.is_valid()):
                serializer2.save()
                return Response('Successfully registered',status=status.HTTP_201_CREATED)
            else: Response(serializer2.errors,status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCustomers(request,pk):
    customers = Customer.objects.filter(owner=pk)
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOwners(request):
    owners = Owner.objects.all()
    serializer = OwnerSerializer(owners, many=True)
    return Response(serializer.data)



class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        owner = Owner.objects.filter(user=user.id)
        customer = Customer.objects.filter(user=user.id)

        role = 'user'
        if owner.exists():
            role = 'owner'
        elif customer.exists():
            role = 'customer'

        response = Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'Role': role
        },status=status.HTTP_200_OK)

        return response

# def getType(pk):
#     owner = Owner.objects.get(User = pk)
#     if owner.exists():

#         return {"owner":owner}
#     customer = Customer.objects.get(User = pk)

#     if customer.exists():
#         return {"customer":customer}

#     return "none"


# def login(request,pk):
#     user = getType(pk)
#     if user.key == "owner":
#         return user

# testing remaining
def getOrderDetails(request,pk):
    orders = orderDetails.objects.filter(customer=pk)
    serializer = CustomerSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCustomerProfile(request):
    # profile = request.user.customer
    # print(request.user.id)
    profile = Customer.objects.get(user=request.user.id)
    serializer = ProfileSerializer(profile, many=False)
    print(profile)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOwnerProfile(request):
    profile = Owner.objects.get(user=request.user.id)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)
