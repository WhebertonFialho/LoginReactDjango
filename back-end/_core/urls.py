from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from usuario.api.viewsets import *

router = routers.DefaultRouter()
router.register(r'auth/usuario', UsuariosViewSet, basename='Usuarios')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/login', LoginViewSet.as_view(), name='Login'),
    path('auth/usuario', CadastroUsuarioViewSet.as_view(), name='Registrar'),
    path('auth/alterarSenha/<uuid:pk>/', AlterarSenhaViewSet.as_view(), name='AlterarSenha')
]
