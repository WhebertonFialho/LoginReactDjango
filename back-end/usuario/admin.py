
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from django import forms
from usuario.models import Usuario

class UserCriarForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = Usuario
        fields = ('username',)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise ValidationError("Senhas são diferentes")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UsuarioForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = Usuario
        fields = ('id', 'username', 'password', 'nome', 'is_active', 'is_admin', 'altera_senha')

    def clean_password(self):
        return self.initial["password"]

class UsuarioAdmin(BaseUserAdmin):
    form = UsuarioForm
    add_form = UserCriarForm

    list_display = ('username',)
    list_filter = ('username', )
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Informações Pessoais', {'fields': ('nome',)}),
        ('Permissões', {'fields': ('is_admin',)}),
        ('Status', {'fields': ('is_active', 'altera_senha',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('id', 'username', 'nome', 'is_active', 'password1', 'password2'),
        }),
    )
    search_fields = ('username',)
    ordering = ('username',)
    filter_horizontal = ()


admin.site.register(Usuario, UsuarioAdmin)