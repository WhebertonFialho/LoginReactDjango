
from django.contrib.auth import authenticate, login, logout

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import  Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from usuario.models import Usuario
from usuario.utils import gera_token

from .serializers import UsuarioSerializer, AlteraSenhaSerializer, UsuariosSerializer

class CadastroUsuarioViewSet(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, format=None):
        usuario = self.get_object(pk)
        serializer = UsuarioSerializer(usuario, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @classmethod
    def get_extra_actions(cls):
        return []

class LoginViewSet(APIView):
    def post(self, request):
        if 'username' not in request.data or 'password' not in request.data:
            return Response({'mensagem': 'Credenciais são necessárias'}, status=status.HTTP_400_BAD_REQUEST)
        
        username = request.POST['username']
        password = request.POST['password']
        usuario = authenticate(request, username=username, password=password)

        if usuario is not None:
            login(request, usuario)
            dados_autenticacao = gera_token(request.user)

            queryset = Usuario.objects.filter(username=usuario)
            serializer = UsuarioSerializer(queryset, many=True)
            
            return Response({ 'usuario': serializer.data,  **dados_autenticacao}, status=status.HTTP_200_OK)
        
        return Response({'mensagem': 'Credenciais são Inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @classmethod
    def get_extra_actions(cls):
        return []
      
class LogoutViewSet(APIView):
    def post(self, request):
        logout(request)
        return Response({'mensagem': 'Logout efetuado com sucesso'}, status=status.HTTP_200_OK)
    
    @classmethod
    def get_extra_actions(cls):
        return []

class AlterarSenhaViewSet(generics.UpdateAPIView):
    queryset = Usuario.objects.all()
    #permission_classes = (IsAuthenticated,)
    serializer_class = AlteraSenhaSerializer
    
class UsuariosViewSet(ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    queryset = Usuario.objects.all()
    serializer_class = UsuariosSerializer
    filterset_fields = ['id', 'username', 'nome']