# Backend de Autenticación con Django

Este es el backend para una aplicación web completa con un frontend en React. La aplicación implementa un flujo de autenticación de usuarios que incluye registro, inicio de sesión, un panel de control privado y cierre de sesión.

## Puesta en marcha local

Sigue estos pasos para levantar el backend en tu máquina local.

### Prerrequisitos

- Python 3.8 o superior
- `pip` y `venv`

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

2.  **Crea y activa un entorno virtual:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

3.  **Instala las dependencias:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Aplica las migraciones de la base de datos:**

    ```bash
    python manage.py migrate
    ```

5.  **(Opcional) Crea un superusuario para acceder al panel de administración de Django:**

    ```bash
    python manage.py createsuperuser
    ```

### Ejecución

Para iniciar el servidor de desarrollo de Django, ejecuta el siguiente comando:

```bash
python manage.py runserver
```

El servidor estará disponible en `http://127.0.0.1:8000`.

## Endpoints de la API

-   `POST /api/register/`: Registro de un nuevo usuario.
    -   Campos: `username`, `email`, `password`, `password2`
-   `POST /api/login/`: Inicio de sesión. Devuelve tokens JWT de acceso y de refresco.
    -   Campos: `email`, `password`
-   `POST /api/login/refresh/`: Refresca el token de acceso.
    -   Campo: `refresh`
-   `GET /api/dashboard/`: Endpoint protegido que devuelve los datos del usuario autenticado.
    -   Requiere un token de acceso en la cabecera `Authorization: Bearer <token>`.
