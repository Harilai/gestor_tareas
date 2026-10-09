# Evidencias individuales - Práctica 1 DevOps

## 1. Colaboración DevOps - RA1.a

### a) Trabajar en una rama feature

Respuesta: Me permitió programar la función de eliminar tareas sin tocar develop ni main, así un error mío no rompía la versión común y mis compañeros podían trabajar en paralelo en sus propias funcionalidades.

### b) Abrir un Pull Request y que otro compañero lo revise

Respuesta: El Pull Request hace visible qué cambios se proponen (ficheros y líneas) y obliga a que otra persona los compruebe antes de integrarlos en develop, lo que reduce errores y deja constancia de la revisión.

### c) Resolver un conflicto de README.md entre varios cambios

Respuesta: Como todos modificamos la misma línea del README, Git no pudo decidir cuál conservar y tuvimos que ponernos de acuerdo en una única frase final, lo que obliga a coordinarse cuando dos trabajos afectan a la misma parte.

## 2. CI/CD - RA1.b

### a) Integración Continua (CI)

Respuesta: En CI se automatizan las comprobaciones (cargar el proyecto, ejecutar pruebas, revisar errores) cada vez que se hace push o se abre un Pull Request, en lugar de probarlo a mano antes de aprobar.

### b) Entrega / Despliegue Continuo (CD)

Respuesta: Una vez superadas las comprobaciones, el software se entrega o despliega automáticamente a un entorno (por ejemplo, publicar la web), sin pasos manuales.

### c) Dos comprobaciones de esta práctica que automatizarías en un pipeline futuro

1. Comprobar que las funciones principales (añadir, eliminar, completar y filtrar tareas) funcionan, que ahora probamos a mano antes de aprobar cada PR.
2. Comprobar que la aplicación carga sin errores de JavaScript en el navegador al abrir index.html.

## 3. Selección de herramientas - RA1.e

Herramientas de referencia: Git, GitHub, GitHub Actions, Jenkins, SonarQube y OWASP ZAP.

### Contexto A
Equipo pequeño que ya trabaja en GitHub y quiere ejecutar pruebas automáticamente en cada Pull Request.

Herramienta principal de CI/CD elegida: GitHub Actions

Justificación (2-3 líneas): Está integrada en GitHub, donde ya está el repositorio, y puede lanzarse automáticamente al abrir un Pull Request. No hace falta montar ni mantener un servidor propio, lo que encaja con un equipo pequeño.

### Contexto B
Empresa que quiere administrar su propio servidor de automatización y conectarlo con repositorios y entornos internos.

Herramienta principal de CI/CD elegida: Jenkins

Justificación (2-3 líneas): Es un servidor de automatización que la propia empresa puede instalar y administrar, y se puede conectar con distintos repositorios y entornos internos mediante plugins, lo que da el control que pide la empresa.

### Herramienta adicional opcional

Si añadirías SonarQube u OWASP ZAP, indica cuál y qué comprobaría: SonarQube, para analizar el código de forma estática y detectar errores, malas prácticas y problemas de calidad en cada integración.