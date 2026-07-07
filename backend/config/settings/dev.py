from .base import *  # noqa: F403

DEBUG = True

# Emails print to the runserver console during development.
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
