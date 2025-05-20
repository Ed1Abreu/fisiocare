from django.urls import path
from .views import (CadastroClienteView, CadastroMedicoView,ListaEspecialidadesView, ClienteLoginView, MedicoLoginView)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('cadastro/cliente/', CadastroClienteView.as_view(), name='cadastro_cliente'),
    path('cadastro/medico/', CadastroMedicoView.as_view(), name='cadastro_medico'),
    path('especialidades/', ListaEspecialidadesView.as_view(), name='lista_especialidades'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', ClienteLoginView.as_view(), name='cliente-login'),
    path('med-login/', MedicoLoginView.as_view(), name='medico-login'),
    
]
