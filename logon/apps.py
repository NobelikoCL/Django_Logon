from django.apps import AppConfig

class LogonConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'logon'
    
    def ready(self):
        import logon.signals  # Importar señales para el modelo de usuario
