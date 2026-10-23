# Evidencias individuales - Práctica 1 DevOps

Renombra este fichero como `devops-nombre-apellido.md` y complétalo dentro de tu rama feature.

## 1. Colaboración DevOps - RA1.a

Explica en 1-2 frases qué aporta cada acción al trabajo colaborativo:

### a) Trabajar en una rama feature

Respuesta: Permite desarrollar una funcionalidad por separado sin modificar directamente la rama principal. Así, cada compañero puede trabajar de forma independiente y reducir el riesgo de errores.

### b) Abrir un Pull Request y que otro compañero lo revise

Respuesta: Permite revisar los cambios antes de integrarlos en la rama principal. Otro compañero puede detectar errores, proponer mejoras y comprobar que el código funciona correctamente.

### c) Resolver un conflicto de README.md entre varios cambios

Respuesta: Permite combinar los cambios de diferentes compañeros sin perder información importante. Resolver el conflicto correctamente evita que se sobrescriban cambios y mantiene el trabajo coordinado.

## 2. CI/CD - RA1.b

### a) Integración Continua (CI)

Explica con tus palabras qué podría automatizarse al hacer `push` o abrir un Pull Request:

Respuesta: Se podrían ejecutar automáticamente pruebas, comprobar que el código no tiene errores de sintaxis y verificar que los cambios cumplen las normas del proyecto. Así, los errores se detectan antes de integrar el código.

### b) Entrega / Despliegue Continuo (CD)

Explica qué podría ocurrir automáticamente después de superar las comprobaciones:

Respuesta: El proyecto podría prepararse y publicarse automáticamente en un entorno de pruebas. Si se cumplen todas las condiciones, también podría desplegarse en producción sin tener que realizar todos los pasos manualmente.

### c) Dos comprobaciones de esta práctica que automatizarías en un pipeline futuro

1. Comprobar que el código JavaScript no tiene errores de sintaxis.
2.  Verificar que las funcionalidades de la aplicación funcionan correctamente mediante pruebas automatizadas.

## 3. Selección de herramientas - RA1.e

Herramientas de referencia: Git, GitHub, GitHub Actions, Jenkins, SonarQube y OWASP ZAP.

### Contexto A
Equipo pequeño que ya trabaja en GitHub y quiere ejecutar pruebas automáticamente en cada Pull Request.

Herramienta principal de CI/CD elegida:

Justificación (2-3 líneas): Se integra directamente con GitHub y permite ejecutar pruebas y otras comprobaciones automáticamente al abrir un Pull Request. Además, facilita la configuración de los procesos de CI/CD mediante archivos YAML dentro del repositorio.


### Contexto B
Empresa que quiere administrar su propio servidor de automatización y conectarlo con repositorios y entornos internos.

Herramienta principal de CI/CD elegida:

Justificación (2-3 líneas): Permite instalar y administrar un servidor de automatización propio. Es flexible, dispone de numerosos complementos y puede conectarse con diferentes repositorios, herramientas y entornos internos de la empresa.

### Herramienta adicional opcional

Si añadirías SonarQube u OWASP ZAP, indica cuál y qué comprobaría:
