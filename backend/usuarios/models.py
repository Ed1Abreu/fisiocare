from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    is_cliente = models.BooleanField(default=False)
    is_medico = models.BooleanField(default=False)
    # Username, email, password já estão incluídos

class Especialidade(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.nome
    
    
class PerfilCliente(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='perfil_cliente')
    nome_completo = models.CharField(max_length=255)
    email = models.EmailField()
    cpf = models.CharField(max_length=14, unique=True)
    rg = models.CharField(max_length=20)
    telefone = models.CharField(max_length=20)
    endereco = models.CharField(max_length=255)
    data_nascimento = models.DateField()

    def __str__(self):
        return self.nome_completo

class PerfilMedico(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='perfil_medico')
    nome_completo = models.CharField(max_length=255)
    email_profissional = models.EmailField()
    cpf = models.CharField(max_length=14, unique=True)
    crefito = models.CharField(max_length=20)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.SET_NULL, null=True)
    telefone = models.CharField(max_length=20)
    endereco_consultorio = models.TextField()
    data_nascimento = models.DateField()

    def __str__(self):
        return f'{self.nome_completo} - {self.especialidade}'
