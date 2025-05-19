from rest_framework import serializers
from .models import Usuario, PerfilCliente, PerfilMedico, Especialidade
from django.contrib.auth.password_validation import validate_password

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'is_medico', 'is_cliente']

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = '__all__'

class CadastroClienteSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(write_only=True)  # receber username
    senha = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    senha2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = PerfilCliente
        fields = ['usuario', 'nome_completo', 'email', 'cpf', 'rg', 'telefone', 'endereco', 'data_nascimento', 'senha', 'senha2']

    def validate(self, data):
        if data['senha'] != data['senha2']:
            raise serializers.ValidationError({"senha": "As senhas não coincidem."})
        return data

    def create(self, validated_data):
        usuario_username = validated_data.pop('usuario')
        senha = validated_data.pop('senha')
        validated_data.pop('senha2')

        # Criar o usuário
        user = Usuario.objects.create_user(username=usuario_username, password=senha)
        user.is_cliente = True
        user.save()

        # Criar perfil cliente vinculado ao usuário
        perfil = PerfilCliente.objects.create(usuario=user, **validated_data)
        return perfil

class CadastroMedicoSerializer(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    senha2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = PerfilMedico
        fields = ['usuario', 'nome_completo', 'email_profissional', 'cpf', 'crefito', 'especialidade', 'telefone', 'endereco_consultorio', 'data_nascimento', 'senha', 'senha2']

    def validate(self, attrs):
        if attrs['senha'] != attrs['senha2']:
            raise serializers.ValidationError({"senha": "As senhas não coincidem."})
        return attrs

    def create(self, validated_data):
        senha = validated_data.pop('senha')
        validated_data.pop('senha2')
        usuario = validated_data.pop('usuario')
        user = Usuario.objects.create_user(username=usuario.username, password=senha)
        user.is_medico = True
        user.save()
        medico = PerfilMedico.objects.create(usuario=user, **validated_data)
        return medico