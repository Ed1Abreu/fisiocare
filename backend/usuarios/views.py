from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Especialidade
from .serializers import (
    CadastroClienteSerializer,
    CadastroMedicoSerializer,
    EspecialidadeSerializer,
    LoginSerializer,
    MedicoLoginSerializer
)

class CadastroClienteView(generics.CreateAPIView):
    serializer_class = CadastroClienteSerializer
    permission_classes = [AllowAny]

class CadastroMedicoView(generics.CreateAPIView):
    serializer_class = CadastroMedicoSerializer
    permission_classes = [AllowAny]

class ListaEspecialidadesView(generics.ListAPIView):
    queryset = Especialidade.objects.all()
    serializer_class = EspecialidadeSerializer

class ClienteLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicoLoginView(APIView):
    def post(self, request):
        serializer = MedicoLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MeuPerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"mensagem": f"Olá, {request.user.username}!"})
