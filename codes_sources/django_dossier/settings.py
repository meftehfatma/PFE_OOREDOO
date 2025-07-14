# settings.py

from pathlib import Path
import os
import logging
import sys

logging.basicConfig(
    level=logging.DEBUG,
    stream=sys.stdout,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
ROOT_URLCONF = 'django_project.urls'
DEBUG = True

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',   # ← UNE seule fois ici

    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ← en haut
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS (sécurité)
CORS_ALLOW_ALL_ORIGINS = True  # ← pour dev uniquement, sinon remplace par CORS_ALLOWED_ORIGINS = [...]

# ALLOWED_HOSTS
ALLOWED_HOSTS = ['localhost', '127.0.0.1']


BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    "/media/fatma/647c2ba2-2142-4259-a840-e8f23a1fedad/pfe/front-end/build/static",
]
SECRET_KEY = 'g%4e9hgvjaqdgv0g5@@9oo8v8mwk95fg3m0%5tyg3)mxk$$#gp'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ["/media/fatma/647c2ba2-2142-4259-a840-e8f23a1fedad/pfe/front-end/build"],
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



