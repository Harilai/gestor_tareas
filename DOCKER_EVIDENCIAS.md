# Evidencias grupales · Práctica 2 Docker

**Equipo:** TODO  
**Integrantes:** TODO  
**Fecha:** 27/11/2026

> No hace falta una captura por comando. Bastan resultados breves y explicaciones comprensibles. Las evidencias son del **equipo**.

## 1. Primeros contenedores

- [ ] `docker --version` / `docker compose version` comprobados.
- [ ] `hello-world` ejecutado.
- [ ] Nginx accesible en `http://localhost:8081`.
- [ ] Se ha detenido, iniciado y eliminado el contenedor.

**Comandos utilizados y resultado:**

1. `docker --version` y `docker compose version` muestran las versiones instaladas de Docker y Docker Compose.
2. `docker run --rm hello-world` descarga (si hace falta) y ejecuta el contenedor de prueba. La opción `--rm` elimina automáticamente el contenedor cuando termina.
3. `docker pull nginx:stable-alpine` descarga la imagen de Nginx. Después, `docker run -d --name nginx-prueba -p 127.0.0.1:8081:80 nginx:stable-alpine` crea y arranca un contenedor en segundo plano.
4. `docker stop nginx-prueba` detiene el contenedor; `docker start nginx-prueba` lo vuelve a iniciar; `docker rm nginx-prueba` lo elimina (si está detenido). La imagen permanece descargada.

**¿Qué significa `8081:80`?**

Tiene el formato `puerto_host:puerto_contenedor`. El puerto 8081 del ordenador se redirige al puerto 80 del contenedor, donde escucha Nginx. La dirección `127.0.0.1` limita el acceso publicado al propio ordenador.

## 2. Nuestra imagen

- [x] Imagen construida con `docker build`.
- [x] Aplicación accesible en `http://localhost:8080`.
- [ ] Cambio visual comprobado tras reconstruir y recrear el contenedor.

**Comandos y resultados:**

1. El `Dockerfile` parte de `nginx:stable-alpine` y copia los archivos HTML, CSS y JavaScript de la aplicación al directorio web de Nginx.
2. `docker build -t gestor-tareas:2.0 .` construye la imagen propia con la etiqueta `2.0`. El punto final indica que el contexto de construcción es el directorio actual.
3. Para probarla de forma independiente se puede ejecutar:
   `docker run -d --name gestor-tareas -p 127.0.0.1:8080:80 gestor-tareas:2.0`
4. La aplicación se ha abierto y se han comprobado sus funciones desde el navegador. En el despliegue final con Compose, el puerto 8080 lo publica el servicio `proxy`, no `web`.

**¿Por qué el contenedor antiguo no cambia al reconstruir la imagen?**

Porque el contenedor creado sigue utilizando la imagen y los archivos con los que se creó. `docker build` genera una imagen nueva, pero no modifica los contenedores existentes. Para utilizar la nueva versión hay que recrear el contenedor (o ejecutar `docker compose up -d --build` si se gestiona con Compose).

## 3. Persistencia de datos

- [x] Volumen creado.
- [x] Un contenedor escribe un archivo en el volumen.
- [x] Otro contenedor recupera el archivo desde el mismo volumen.

**Comandos y resultado:**

Se creó el volumen `gestor-datos` y se comprobó su existencia:

```powershell
docker volume create gestor-datos
docker volume ls
```

Se escribió un archivo desde un contenedor temporal:

```powershell
docker run --rm -v gestor-datos:/datos alpine sh -c "echo 'Datos persistentes de gestor_tareas' > /datos/prueba.txt"
```

Después, otro contenedor temporal leyó el archivo:

```powershell
docker run --rm -v gestor-datos:/datos alpine cat /datos/prueba.txt
```

**Resultado obtenido:**

```text
Datos persistentes de gestor_tareas
```

**¿Qué relación tiene esto con las bases de datos?**

El volumen conserva los datos fuera del ciclo de vida de un contenedor. En una aplicación con base de datos, se montaría un volumen en el directorio donde la base de datos guarda sus ficheros, para que los datos no se pierdan al eliminar o recrear el contenedor.

**Nota:** las tareas de esta aplicación se guardan en `localStorage` del navegador. La práctica no pide conectar ese almacenamiento con el volumen Docker; la prueba anterior demuestra por separado cómo funciona la persistencia de volúmenes.

## 4. Docker Compose

- [x] Servicios `web` y `proxy` iniciados.
- [x] La aplicación funciona en `http://localhost:8080`.
- [x] Se ha consultado `docker compose ps`.
- [x] Se ha probado la comunicación `proxy` → `web`.

**Configuración y comandos utilizados:**

- `compose.yaml` define el servicio `web`, que construye la imagen de la aplicación, y el servicio `proxy`, basado en `nginx:stable-alpine`.
- El servicio `proxy` publica `127.0.0.1:8080:80` y monta `./proxy/default.conf` en `/etc/nginx/conf.d/default.conf:ro`.
- El servicio `proxy` depende de `web`. El servicio `web` no publica puertos en el ordenador.
- En `proxy/default.conf`, la directiva `proxy_pass http://web:80;` reenvía las peticiones al servicio web.

Comandos de validación y despliegue:

```powershell
docker compose config
docker compose up -d --build
docker compose ps
```

La aplicación se comprobó desde `http://localhost:8080`. También se comprobó la respuesta del servicio web desde el proxy:

```powershell
docker compose exec proxy wget -qO- http://web:80/
```

**¿Por qué el proxy se conecta a `web` por su nombre?**

Compose crea una red para el proyecto y proporciona resolución DNS interna para los servicios. Por eso el proxy puede utilizar el nombre `web` como dirección del servicio, sin conocer ni configurar su IP. La IP puede cambiar al recrear el contenedor, pero el nombre del servicio se mantiene.

## 5. Incidencias

Las tres pruebas siguientes forman parte de la fase E. Hay que ejecutarlas y confirmar el resultado antes de marcar cada incidencia como resuelta.

**Incidencia 1 - Puerto ocupado**

- **Prueba:** con Compose levantado, intentar publicar de nuevo el puerto 8080:
  `docker run -d --name prueba-puerto -p 127.0.0.1:8080:80 nginx:stable-alpine`
- **Síntoma esperado:** Docker no puede arrancar el segundo contenedor porque el puerto 8080 ya está ocupado por el servicio `proxy`.
- **Causa:** dos contenedores no pueden reservar simultáneamente la misma dirección y puerto del host.
- **Solución:** identificar al contenedor que publica el puerto con `docker ps`; detener/eliminar el contenedor de prueba si llegó a crearse (`docker rm -f prueba-puerto`) o elegir otro puerto del host. No es necesario borrar el volumen ni la imagen.

**Incidencia 2 - Cambios que no aparecen**

- **Prueba:** modificar temporalmente el título de la página y volver a cargar el navegador sin reconstruir la imagen.
- **Síntoma esperado:** el contenedor sigue mostrando la versión anterior porque contiene los archivos copiados durante la construcción de la imagen.
- **Causa:** editar los archivos del proyecto no modifica automáticamente la imagen ni el contenedor.
- **Solución:** reconstruir y recrear los servicios con `docker compose up -d --build`; comprobar el cambio y dejar el título definitivo.

**Incidencia 3 - Servicio incorrecto en Nginx**

- **Prueba:** cambiar temporalmente `proxy_pass http://web:80;` por `proxy_pass http://servicio-inexistente:80;` en `proxy/default.conf`. Recrear el proxy con `docker compose up -d --force-recreate proxy` y consultar `docker compose logs proxy`.
- **Síntoma esperado:** el proxy no puede resolver el nombre del servicio y las peticiones no llegan a la aplicación.
- **Causa:** el nombre configurado no coincide con ningún servicio de la red de Compose.
- **Solución:** restaurar `proxy_pass http://web:80;` y recrear el proxy con `docker compose up -d --force-recreate proxy`. Comprobar de nuevo `http://localhost:8080`.

## 6. Conclusión del equipo

**Dos cosas que hemos aprendido:**

1. Una imagen contiene los archivos y la configuración con los que se crean los contenedores; reconstruirla no actualiza automáticamente los contenedores que ya existen.
2. Docker Compose permite desplegar varios servicios en una red común y comunicarlos mediante sus nombres de servicio. Los volúmenes permiten conservar datos aunque se eliminen los contenedores.

**Una duda o dificultad que hemos tenido:**

Al principio, el motor de Docker Desktop no estaba iniciado y la CLI no podía conectarse a `dockerDesktopLinuxEngine`. Se solucionó iniciando Docker Desktop y comprobando el estado con `docker info`.

## 7. Colaboración

**Enlaces a Pull Requests relevantes:** TODO

