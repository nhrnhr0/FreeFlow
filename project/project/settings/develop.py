from .base import *


DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS.insert(0,'livereload');

MIDDLEWARE += [
    'livereload.middleware.LiveReloadScript',
]