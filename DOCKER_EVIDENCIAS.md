# Evidencias grupales · Práctica 2 Docker

**Equipo:** Abichuelas  
**Integrantes:** Daniel Tejero, Pablo Serdio, Pablo Blanco, Eustakio Gonzalez  
**Fecha:** 27/11/2026

> Evidencias del equipo. Se incluyen los comandos y los resultados principales.

## 1. Primeros contenedores

- [x] Versiones de Docker y Docker Compose comprobadas.
- [x] Contenedor `hello-world` ejecutado.
- [x] Nginx accesible en `http://localhost:8081`.
- [x] Contenedor detenido, iniciado y eliminado.

**Comandos utilizados:**

```powershell
docker --version
docker compose version
docker run --rm hello-world
docker pull nginx:stable-alpine
docker images
docker run -d --name nginx-prueba -p 127.0.0.1:8081:80 nginx:stable-alpine
docker ps
docker logs nginx-prueba
docker exec -it nginx-prueba sh
```

Dentro del contenedor se puede comprobar el contenido de la carpeta web con:

```sh
ls /usr/share/nginx/html
exit
```

Después:

```powershell
docker stop nginx-prueba
docker start nginx-prueba
docker stop nginx-prueba
docker rm nginx-prueba
```

**¿Qué hace la opción `--rm`?**

Elimina automáticamente el contenedor cuando termina su ejecución. La imagen utilizada no se elimina.

**¿Qué significa `127.0.0.1:8081:80`?**

El puerto 8081 del ordenador se redirige al puerto 80 del contenedor, donde escucha Nginx. `127.0.0.1` limita el acceso al propio ordenador.

## 2. Nuestra imagen

- [x] Imagen construida con `docker build`.
- [x] Aplicación accesible.
- [x] Cambio visual comprobado tras reconstruir la imagen y recrear el contenedor.

**Comandos utilizados:**

```powershell
docker build -t gestor-tareas:2.0 .
docker run -d --name gestor-tareas -p 127.0.0.1:8080:80 gestor-tareas:2.0
```

Para comprobar los cambios de los archivos de la aplicación se modifica el título en `index.html` y se reconstruye la imagen. En el despliegue con Compose se utiliza:

```powershell
docker compose up -d --build
```

**¿Por qué no aparecen los cambios sin reconstruir?**

La imagen contiene una copia de los archivos realizada durante la construcción. Editar el proyecto no modifica los contenedores existentes; hay que reconstruir la imagen y recrear el servicio.

**¿Para qué sirve `.dockerignore`?**

Indica qué archivos y carpetas se excluyen del contexto enviado a Docker durante la construcción de la imagen. Así se evita copiar elementos innecesarios, como los archivos de Git o las evidencias.

## 3. Persistencia de datos

- [x] Volumen creado.
- [x] Un contenedor escribe un archivo en el volumen.
- [x] Otro contenedor recupera el archivo.

**Comandos utilizados:**

```powershell
docker volume create gestor-datos
docker volume ls
docker run --rm -v gestor-datos:/datos alpine sh -c "echo 'Datos persistentes de gestor_tareas' > /datos/prueba.txt"
docker run --rm -v gestor-datos:/datos alpine cat /datos/prueba.txt
```

**Resultado obtenido:**

```text
Datos persistentes de gestor_tareas
```

**¿Por qué se conserva el archivo cuando desaparece el primer contenedor?**

Porque el archivo se guarda en un volumen Docker, que tiene un ciclo de vida independiente del contenedor. Al eliminar el contenedor, el volumen y sus datos permanecen.

**¿Para qué sirve en una aplicación con base de datos?**

El volumen conserva los ficheros de la base de datos aunque se elimine o recree su contenedor.

**Nota:** las tareas de esta aplicación se guardan en el `localStorage` del navegador. El volumen se ha probado por separado para demostrar la persistencia de datos.

## 4. Docker Compose

- [x] Servicios `web` y `proxy` iniciados.
- [x] Aplicación accesible en `http://localhost:8080`.
- [x] Estado comprobado con `docker compose ps`.
- [x] Comunicación `proxy` → `web` comprobada.

**Configuración:**

- `web`: construye y sirve la aplicación con Nginx.
- `proxy`: publica el puerto 8080 y reenvía las peticiones a `web`.
- Ambos servicios se comunican por la red interna de Compose mediante el nombre `web`.

**Comandos utilizados:**

```powershell
docker compose config
docker compose up -d --build
docker compose ps
docker compose exec proxy wget -qO- http://web:80/
```

**Gestión de los servicios:**

```powershell
docker compose logs proxy
docker compose restart web
docker compose stop
docker compose start
docker compose down
docker compose up -d
```

- `logs`: muestra los registros del servicio.
- `restart`: reinicia el servicio indicado.
- `stop`: detiene los servicios sin eliminarlos.
- `start`: inicia los servicios detenidos.
- `down`: detiene y elimina los contenedores y la red de Compose.
- `up -d`: inicia los servicios en segundo plano.

**¿Por qué el proxy utiliza `web:80`?**

Compose proporciona DNS interno para los servicios. El nombre `web` permite localizar el contenedor sin conocer su IP.

## 5. Incidencias

**Incidencia 1 - Puerto ocupado**

- **Prueba:** intentar iniciar otro contenedor publicando el puerto 8080:
  `docker run -d --name prueba-puerto -p 127.0.0.1:8080:80 nginx:stable-alpine`
- **Resultado:** Docker no puede asignar el puerto porque ya lo utiliza el servicio `proxy` (`port is already allocated`).
- **Causa:** el mismo puerto del equipo no puede estar publicado por dos contenedores a la vez.
- **Solución:** identificar el contenedor con `docker ps` y liberar el puerto o utilizar otro.

**Incidencia 2 - Cambios que no aparecen**

- **Prueba:** modificar el título de `index.html` y recargar sin reconstruir la imagen.
- **Resultado:** se mantiene la versión anterior.
- **Causa:** los archivos se copiaron a la imagen durante su construcción.
- **Solución:** ejecutar `docker compose up -d --build` para reconstruir la imagen y recrear el servicio.

**Incidencia 3 - Proxy mal configurado**

- **Prueba:** cambiar temporalmente `proxy_pass http://web:80;` por `proxy_pass http://servicio-inexistente:80;` en `proxy/default.conf`. Recrear el proxy y consultar `docker compose logs proxy`.
- **Resultado:** Nginx no puede resolver el nombre del servicio y falla el acceso a la aplicación.
- **Causa:** el nombre configurado no coincide con ningún servicio de Compose.
- **Solución:** restaurar `proxy_pass http://web:80;` y ejecutar `docker compose up -d --force-recreate proxy`.


## 6. Conclusión del equipo

**Dos cosas que hemos aprendido:**

1. Reconstruir una imagen no actualiza los contenedores que ya existen.
2. Docker Compose permite desplegar servicios conectados por una red interna; los volúmenes conservan datos fuera del ciclo de vida de los contenedores.

**Dificultad encontrada:**

Docker Desktop no estaba iniciado y la CLI no podía conectarse a `dockerDesktopLinuxEngine`. Se solucionó iniciando Docker Desktop y comprobando el estado con `docker info`.

## 7. Colaboración

- Repositorio: https://github.com/Harilai/gestor_tareas
- Pull Request de Docker: https://github.com/Harilai/gestor_tareas/pull/7 (`feat/docker` → `develop`).
