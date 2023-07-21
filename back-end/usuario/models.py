from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
import uuid

class UsuarioManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError('Username é Obrigatório')
        
        usuario = self.model(username=username, **extra_fields )
        usuario.set_password(password)
        usuario.save(using=self._db)

        return usuario

    def create_superuser(self, username, password, **extra_fields):
        usuario = self.create_user( username=username, password=password, **extra_fields )
        usuario.is_admin = True
        usuario.is_superuser = True
        usuario.save(using=self._db)

        return usuario

class Usuario(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4)
    username = models.CharField(max_length=50, unique=True, verbose_name='Username')
    nome = models.CharField(max_length=100, verbose_name='Nome')
    altera_senha = models.BooleanField(default=True, verbose_name='Altera Senha Proximo Login?')
    is_active = models.BooleanField(default=True, verbose_name='Ativo?')
    is_admin = models.BooleanField(default=False, verbose_name='Administrador?')
    objects = UsuarioManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nome']

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
        db_table = 'auth_user'

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True