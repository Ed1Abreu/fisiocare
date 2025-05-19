from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    is_medico = models.BooleanField(default=False)
    is_cliente = models.BooleanField(default=False)

class Especialidade(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class PerfilCliente(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=255)
    email = models.EmailField()
    cpf = models.CharField(max_length=14, unique=True)
    rg = models.CharField(max_length=20, unique=True)
    telefone = models.CharField(max_length=20)
    endereco = models.TextField()
    data_nascimento = models.DateField()

class PerfilMedico(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=255)
    email_profissional = models.EmailField()
    cpf = models.CharField(max_length=14, unique=True)
    crefito = models.CharField(max_length=20)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.SET_NULL, null=True)
    telefone = models.CharField(max_length=20)
    endereco_consultorio = models.TextField()
    data_nascimento = models.DateField()
    
      # def total_pacientes(self):
    #     return PerfilCliente.objects.filter(consulta__medico=self).distinct().count()

    # def consultas_hoje(self):
    #     from datetime import date
    #     return self.consulta_set.filter(data=date.today()).count()

    # def taxa_ocupacao(self):
    #     from datetime import date
    #     total_slots = 10
    #     return (self.consultas_hoje() / total_slots) * 100
    
    def __str__(self):
        return f'{self.nome_completo} - {self.especialidade}'

