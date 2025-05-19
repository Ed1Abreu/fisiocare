from rest_framework import generics
from .models import Especialidade
from .serializers import CadastroClienteSerializer, CadastroMedicoSerializer, EspecialidadeSerializer
from rest_framework.permissions import AllowAny

class CadastroClienteView(generics.CreateAPIView):
    serializer_class = CadastroClienteSerializer
    permission_classes = [AllowAny]

class CadastroMedicoView(generics.CreateAPIView):
    serializer_class = CadastroMedicoSerializer
    permission_classes = [AllowAny]

class ListaEspecialidadesView(generics.ListAPIView):
    queryset = Especialidade.objects.all()
    serializer_class = EspecialidadeSerializer