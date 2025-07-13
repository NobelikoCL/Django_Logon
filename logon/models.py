from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

# Create your models here.

class CustomUser(AbstractUser):
    reset_token = models.CharField(max_length=255, null=True, blank=True)
    reset_token_expires = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        return self.username
