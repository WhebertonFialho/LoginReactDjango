from rest_framework_simplejwt.tokens import RefreshToken

def gera_token(usuario):
    refresh = RefreshToken.for_user(usuario)

    return {
        'token': str(refresh.access_token),
        'refresh': str(refresh)
    }