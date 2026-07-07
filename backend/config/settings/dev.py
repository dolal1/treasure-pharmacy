from .base import *  # noqa: F403

DEBUG = True

# Emails go to MailHog in development — view them at http://localhost:8025
# instead of scrolling raw MIME (with base64 PDF attachments) in the logs.
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env("EMAIL_HOST", default="localhost")
EMAIL_PORT = env.int("EMAIL_PORT", default=1025)
EMAIL_USE_TLS = False
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
