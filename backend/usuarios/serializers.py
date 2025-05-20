from rest_framework import serializers
from .models import Usuario, PerfilCliente, PerfilMedico, Especialidade
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from datetime import date

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'is_medico', 'is_cliente']

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = '__all__'

# ----------------------------
# Cadastro Cliente
# ----------------------------
class CadastroClienteSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(write_only=True)
    senha = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    senha2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = PerfilCliente
        fields = ['usuario', 'nome_completo', 'email', 'cpf', 'rg', 'telefone', 'endereco', 'data_nascimento', 'senha', 'senha2']

    def validate_usuario(self, value):
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value

    def validate_data_nascimento(self, value):
        if value > date.today():
            raise serializers.ValidationError("A data de nascimento não pode ser no futuro.")
        return value

    def validate(self, data):
        if data['senha'] != data['senha2']:
            raise serializers.ValidationError({"senha": "As senhas não coincidem."})
        return data

    def create(self, validated_data):
        usuario_username = validated_data.pop('usuario')
        senha = validated_data.pop('senha')
        validated_data.pop('senha2')

        user = Usuario.objects.create_user(username=usuario_username, password=senha)
        user.is_cliente = True
        user.save()

        perfil = PerfilCliente.objects.create(usuario=user, **validated_data)
        return perfil

# ----------------------------
# Cadastro Médico
# ----------------------------
class CadastroMedicoSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(write_only=True)
    especialidade = serializers.PrimaryKeyRelatedField(queryset=Especialidade.objects.all())
    senha = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    senha2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = PerfilMedico
        fields = ['usuario', 'nome_completo', 'email_profissional', 'cpf', 'crefito', 'especialidade', 'telefone', 'endereco_consultorio', 'data_nascimento', 'senha', 'senha2']

    def validate_usuario(self, value):
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value

    def validate_data_nascimento(self, value):
        if value > date.today():
            raise serializers.ValidationError("A data de nascimento não pode ser no futuro.")
        return value

    def validate(self, attrs):
        if attrs['senha'] != attrs['senha2']:
            raise serializers.ValidationError({"senha": "As senhas não coincidem."})
        return attrs

    def create(self, validated_data):
        usuario_username = validated_data.pop('usuario')
        senha = validated_data.pop('senha')
        validated_data.pop('senha2')

        user = Usuario.objects.create_user(username=usuario_username, password=senha)
        user.is_medico = True
        user.save()

        medico = PerfilMedico.objects.create(usuario=user, **validated_data)
        return medico

# ----------------------------
# Login Paciente
# ----------------------------
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    senha = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        senha = attrs.get('senha')

        user = authenticate(username=username, password=senha)
        if not user:
            raise serializers.ValidationError("Credenciais inválidas.")

        if not user.is_cliente:
            raise serializers.ValidationError("Este login é exclusivo para clientes.")

        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'usuario_id': user.id,
            'username': user.username
        }

# ----------------------------
# Login Médico
# ----------------------------    
class MedicoLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    senha = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        senha = attrs.get('senha')

        user = authenticate(username=username, password=senha)
        if not user:
            raise serializers.ValidationError("Credenciais inválidas.")

        if not user.is_medico:
            raise serializers.ValidationError("Este login é exclusivo para médicos.")

        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'usuario_id': user.id,
            'username': user.username
        }