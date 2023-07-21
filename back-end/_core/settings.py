from pathlib import Path
import datetime

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-pg2vpi$7u%k6dcbr&(acs8t-pcy46dvd=e9a-o2%v3)0nenx29'

DEBUG = True

APPEND_SLASH = False

ALLOWED_HOSTS = ['*']

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    'http://localhost',
    'http://127.0.0.1',
    'http://0.0.0.0',
]

INSTALLED_APPS = [
    'corsheaders',
    'django_filters',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'usuario'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = '_core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = '_core.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.OrderingFilter',
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication'
    ],
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated',
    # ]
}

AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator' },
    #{ 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator' },
    #{ 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator' }
]

JWT_ENCODE_HANDLER = 'jwt_auth.utils.jwt_encode_handler'
JWT_DECODE_HANDLER = 'jwt_auth.utils.jwt_decode_handler',
JWT_PAYLOAD_HANDLER = 'jwt_auth.utils.jwt_payload_handler'
JWT_PAYLOAD_GET_USER_ID_HANDLER = 'jwt_auth.utils.jwt_get_user_id_from_payload_handler'
JWT_SECRET_KEY =  SECRET_KEY
JWT_ALGORITHM = 'HS256'
JWT_VERIFY = True
JWT_VERIFY_EXPIRATION = True
JWT_LEEWAY = 0
JWT_EXPIRATION_DELTA = datetime.timedelta(days=30)
JWT_ALLOW_REFRESH = False
JWT_REFRESH_EXPIRATION_DELTA = datetime.timedelta(days=30)
JWT_AUTH_HEADER_PREFIX = 'Bearer'

DATETIME_FORMAT="%Y-%m-%d%H:%M:%S"

LANGUAGE_CODE = 'pt-BR'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CSRF_COOKIE_NAME = 'XSRF-TOKEN'
CSRF_HEADER_NAME = 'HTTP_X_XSRF_TOKEN'

AUTH_USER_MODEL = 'usuario.Usuario'
