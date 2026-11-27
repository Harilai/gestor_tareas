# Despliegue Docker del gestor de tareas

**Equipo:** Abichuelas  
**Integrantes:** Daniel Tejero, Pablo Serdio, Pablo Blanco, Eustakio Gonzalez  
**Repositorio:** https://github.com/Harilai/gestor_tareas

## Requisitos

- Git.
- Docker Desktop o Docker Engine con Docker Compose.
- Docker iniciado antes de ejecutar los comandos.

## Ejecutar la aplicación

Clonar el repositorio y acceder a la carpeta:

```bash
git clone https://github.com/Harilai/gestor_tareas.git
cd gestor_tareas
```

Comprobar la configuración e iniciar los servicios:

```bash
docker compose config
docker compose up -d --build
```

**URL de acceso:** http://localhost:8080

## Detener y eliminar los contenedores

```bash
docker compose down
```

Este comando detiene y elimina los contenedores y la red de Compose. No elimina la imagen ni los volúmenes externos.

## Arquitectura

- **web:** sirve los archivos HTML, CSS y JavaScript con Nginx.
- **proxy:** recibe las peticiones en el puerto 8080 y las reenvía a `web`.
- **Comunicación:** ambos servicios usan la red interna de Compose. El proxy accede a `http://web:80`.

## Posibles problemas

- **Puerto 8080 ocupado:** liberar el puerto o cambiar el puerto publicado en `compose.yaml`.
- **Cambios no visibles:** reconstruir con `docker compose up -d --build`.
- **Proxy sin conexión:** comprobar `proxy/default.conf`; el destino debe ser `http://web:80`.
