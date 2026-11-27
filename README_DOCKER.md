# Despliegue Docker del gestor de tareas

**Equipo:** Abichuelas  
**Integrantes:** Daniel Tejero, Pablo Serdio, Pablo Blanco, Eustakio Gonzalez  
**Repositorio de GitHub:** https://github.com/Harilai/gestor_tareas

## Requisitos

- Git.
- Docker Desktop o Docker Engine con Docker Compose.

## Ejecutar la aplicación

Clonar el repositorio y entrar en la carpeta:

```bash
git clone https://github.com/Harilai/gestor_tareas.git
cd gestor_tareas
```

Construir la imagen e iniciar los servicios:

```bash
docker compose up -d --build
```

**URL de acceso:** http://localhost:8080

## Detener y eliminar los contenedores

```bash
docker compose down
```

## Arquitectura

- **web:** sirve la aplicación con Nginx.
- **proxy:** recibe las peticiones en el puerto 8080 y las reenvía a `web`.
- **Comunicación entre servicios:** usan la red interna de Compose; el proxy accede a `http://web:80`.

## Posibles problemas

- **Puerto 8080 ocupado:** liberar el puerto y volver a iniciar Compose.
- **Cambios no visibles:** reconstruir con `docker compose up -d --build`.
