# Backend de Autenticación con Django

Este es el backend para una aplicación web completa con un frontend en React. La aplicación implementa un flujo de autenticación de usuarios que incluye registro, inicio de sesión, un panel de control privado y cierre de sesión.

## Puesta en marcha local

Sigue estos pasos para levantar el backend en tu máquina local.

### Prerrequisitos

- Python 3.8 o superior
- `pip` y `venv`

### Instalación

1. Clonar el repositorio
2. Crear y activar entorno virtual
3. Instalar dependencias Python:
   ```bash
   pip install -r requirements.txt
   ```
4. Instalar dependencias Node.js:
   ```bash
   cd frontend
   npm install
   ```

## Estructura del Proyecto

```
django_logon/
├── frontend/              # Aplicación frontend React
│   ├── public/
│   └── src/
├── logon/                # Aplicación Django
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── core/                 # Configuración del proyecto Django
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── requirements.txt
└── README.md
```

## Tecnologías Utilizadas

### Backend
- **Python 3.8+**
- **Django 5.2.4**
- **Django REST Framework**
- **djangorestframework-simplejwt**
- **SQLite** (base de datos por defecto)

### Frontend
- **React 18**
- **React Router**
- **Axios**
- **Fetch API**

## Instalación

1. **Configuración del Entorno**
   ```bash
   # Crear entorno virtual
   python -m venv venv
   
   # Activar entorno virtual
   venv\Scripts\activate
   ```

2. **Instalar Dependencias Backend**
   ```bash
   # Instalar dependencias Python
   pip install -r requirements.txt
   ```

3. **Instalar Dependencias Frontend**
   ```bash
   # Navegar al directorio frontend
   cd frontend
   
   # Instalar dependencias npm
   npm install
   ```

## Ejecución de la Aplicación

1. **Iniciar Servidor Django**
   ```bash
   python manage.py runserver
   ```

2. **Iniciar Servidor React**
   ```bash
   # En una nueva terminal
   cd frontend
   npm start
   ```

Los servidores estarán disponibles en:
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

## Funcionalidades

### Registro de Usuarios
- Campos requeridos:
  - Nombre
  - Apellido
  - Correo electrónico
  - Contraseña
  - Confirmar contraseña

- Validaciones de Contraseña:
  - Mínimo 8 caracteres
  - Al menos una letra mayúscula
  - Al menos una letra minúscula
  - Al menos un número
  - Al menos un carácter especial

- Indicador de Fortaleza:
  - Barra visual de fortaleza
  - Animaciones de brillo para fortalezas altas
  - Lista de requisitos con checkmarks animados
  - Mensajes descriptivos de fortaleza

### Login
- Campos requeridos:
  - Correo electrónico
  - Contraseña

- Validaciones:
  - Verificación de credenciales
  - Mensajes de error claros
  - Redirección automática al dashboard

## API Endpoints

### Autenticación
- **Registro**
  - `POST /api/register/` - Registrar nuevo usuario
  - Campos: nombre, apellido, email, password, confirm_password

- **Login**
  - `POST /api/login/` - Iniciar sesión
  - Campos: email, password

- **Logout**
  - `POST /api/logout/` - Cerrar sesión

- **Refresh Token**
  - `POST /api/refresh/` - Refrescar token JWT

## Base de Datos

La aplicación utiliza SQLite como base de datos por defecto. El archivo de base de datos se encuentra en `db.sqlite3`.

## Seguridad

- **JWT Authentication**
  - Tokens de acceso y refresh
  - Validación de tokens
  - Gestión de sesiones segura

- **Validaciones de Contraseña**
  - Mínimo 8 caracteres
  - Requisitos de complejidad
  - Indicador visual de fortaleza
  - Prevención de contraseñas comunes

## Contribución

1. Clonar el repositorio
2. Crear una rama para tus cambios
3. Realizar los cambios necesarios
4. Hacer commit de los cambios
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Configuración

- El frontend está configurado para conectarse al backend en `http://localhost:8000`
- Las credenciales de superusuario se pueden crear con:
  ```bash
  python manage.py createsuperuser
  ```
