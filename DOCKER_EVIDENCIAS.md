# Evidencias grupales · Práctica 2 Docker

**Equipo:** TODO  
**Integrantes:** TODO  
**Fecha:** TODO

> No hace falta una captura por comando. Bastan resultados breves y explicaciones comprensibles. Las evidencias son del **equipo**.

## 1. Primeros contenedores

- [ ] `docker --version` / `docker compose version` comprobados.
- [ ] `hello-world` ejecutado.
- [ ] Nginx accesible en `http://localhost:8081`.
- [ ] Se ha detenido, iniciado y eliminado el contenedor.

**Comandos utilizados y resultado:** 
Los comando que se han utilizado para este apartado han sido:
1. "docker --version" y "docker compose version" (ambos dan las versiones correspondientes)
2. "docker run --rm hello-world" (comprueba que crear un docker funcione. --rm sirve para que se elimine el contenedor se elimine al terminar de ejecutarse)
3. con "docker pull nginx:stable-alpine" nos bajaos la imagen de nginx, despues creamos un contenedor con "docker run -d (para que se quede en segundo plano) --name nginx-prueba (le estamos dando ese nombre al contenedor) -p 127.0.0.1:8081:80 (solo podemos acceder desde nuestro ordenador)".
4. "docker stop nginx-prueba" para parar el contenedor y "docker start nginx-prueba". "docker rm nginx-prueba" elimina el contenedor pero deja la imagen, permitiendo crear otro contenedor con esa misma imagen.


**¿Qué significa `8081:80`?**
8081:80 tiene el formato puerto_host:puerto_contenedor. El 8081 es el puerto de mi PC donde Docker escucha, y todo lo que llega ahí se reenvía al puerto 80 del contenedor, que es donde nginx escucha. Es necesario para poder acceder al contenedor desde fuera, ya que por defecto está aislado. Además, permite tener varios contenedores usando el puerto 80 internamente, porque cada uno se publica en un puerto distinto del PC (8081, 8082...), ya que en el host un puerto solo puede usarlo un proceso a la vez.

## 2. Nuestra imagen

- [ ] Imagen construida con `docker build`.
- [ ] Aplicación accesible en `http://localhost:8080`.
- [ ] Cambio visual comprobado tras reconstruir y recrear el contenedor.

**Comandos y resultados:** 
1. Para crear nuestra propia imagen debemos editar el archivo "dockerfile". Lo que tenemos que hacer es copiar la aplicacion al directorio hmtml de nginx.
2. Una vez editado el dockerfile creamos la imagen con el comando "docker build -t gestor-tareas:2.0 ." (:2.0 es la etiqueta que se le coloca y . sirve para buscar el dockerfile en donde estas situado).
3. Con la imagen creada haremos un "docker run -d --name 'gestor-tareas' -p 127.0.0.1:8080 gestor-tareas:2.0". Una vez echo podremos acceder a la aplicacion desde la url "localhost:8080".

**¿Por qué el contenedor antiguo no cambia al reconstruir la imagen?** 
El contenedor antiguo no cambia. Al ejecutar docker build se crea una imagen nueva con el título modificado, pero los contenedores ya creados siguen usando los archivos de la imagen anterior, porque un contenedor se crea a partir de una imagen en el momento del docker run y la imagen es inmutable. Para que el contenedor use la imagen adecuada debemos borrar ese contenedor y recrearlo con la imagen actualizada.

## 3. Persistencia de datos

- [ ] Volumen creado.
- [ ] Un contenedor escribe un archivo en el volumen.
- [ ] Otro contenedor recupera el archivo tras eliminar el primero.

**Comandos y resultado:** TODO

**¿Qué relación tiene esto con las bases de datos?** TODO

## 4. Docker Compose

- [ ] Servicios `web` y `proxy` iniciados.
- [ ] La aplicación funciona en `http://localhost:8080`.
- [ ] Se ha consultado `docker compose ps`.
- [ ] Se ha probado la comunicación `proxy` → `web`.

**Comandos y resultado:** TODO

**¿Por qué el proxy se conecta a `web` por su nombre?** TODO

## 5. Incidencias

**Incidencia 1 - Puerto ocupado:** qué ocurrió / cómo lo resolvisteis: TODO

**Incidencia 2 - Imagen no actualizada:** qué ocurrió / cómo lo resolvisteis: TODO

**Incidencia 3 - Servicio incorrecto en Nginx:** qué ocurrió / cómo lo resolvisteis: TODO

## 6. Conclusión del equipo

**Dos cosas que hemos aprendido:** TODO

**Una duda o dificultad que hemos tenido:** TODO

## 7. Colaboración

**Enlaces a Pull Requests relevantes:** TODO
