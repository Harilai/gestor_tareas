# Práctica 2 - Imagen para la aplicación del equipo
FROM nginx:stable-alpine

# TODO 1: copiar los archivos de la aplicación al directorio
# que Nginx sirve por defecto: /usr/share/nginx/html/
# Pista: instrucción COPY
COPY css/ /usr/share/nginx/html/css
COPY js/ /usr/share/nginx/html/js
COPY index.html /usr/share/nginx/html/


EXPOSE 80
