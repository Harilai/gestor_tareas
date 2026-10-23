# Evidencias de entrega - Práctica 1

## Evidencias del grupo


- URL del repositorio GitHub: https://github.com/Harilai/gestor_tareas
- PR feature/anadir-tarea -> develop: https://github.com/Harilai/gestor_tareas/pull/1
- PR feature/eliminar-tarea -> develop: https://github.com/Harilai/gestor_tareas/pull/3
- PR feature/completar-tarea -> develop: https://github.com/Harilai/gestor_tareas/pull/4
- PR feature/filtrar-tareas -> develop: https://github.com/Harilai/gestor_tareas/pull/5
- PR develop -> main: https://github.com/Harilai/gestor_tareas/pull/6/
- Conflicto de README.md: indicar en qué rama apareció y cómo se resolvió: https://github.com/Harilai/gestor_tareas/pull/2/
El conflicto aparecio al mergear la rama "ErrorReadmeMd" en la rama "feature/addTask. Esto sucedio porque en ambas ramas el mismo archivo "readme.md" estaba editado en la mismas lineas entonces como github no sabe que hacer lo marca como conflictor para que lo resolvamos. Se puede solucionar quedandote con una de las dos versiones y modificando el archivo para tener ambas cosas. Ademas hemos tenido un conflicto mergeando la rama "eliminar-tarea" a develop en EVIDENCIAS.MD y hemos terminado escogiendo la parte de la rama "eliminar-tarea".

## Historial final

Pegar la salida de:

```bash
git log --oneline --graph --all --decorate
```
* 28d6876 (origin/feature/filtrar-tarea) Añadido el filtrar.js
* fa3efa0 Añadido el md
| * 3dda196 (HEAD -> feature/eliminar-tarea, origin/feature/eliminar-tarea) He completado una parte de EVIDENCIAS.md
| * b9f0892 He completado el archivo devops-pablo-serdio.md
| * de724c2 Actualizado estado del proyecto en README
| * 5863928 Añadido eliminar tareas con delegación de eventos
|/  
| *   f617028 (origin/ErrorReadmeMd) Merge branch 'feature/addTask' into ErrorReadmeMd
| |\  
| | * 4be1d56 (origin/feature/addTask) readme cambiadopara controlar el error y añadido evidencias
| | * 50f9a48 nueva feat completo y md completado
| |/  
|/|   
| * ef4b796 codigo editado en la misma linea
|/  
| * 3a20665 (origin/feature/completar-tarea) Añadido mi .md
| * d41937c Añadido completar.js a la carpeta de js
|/  
* d39287c (origin/main, origin/develop, origin/HEAD, main, develop) proyecto inicial

## Evidencias individuales RA1

Comprobar que cada integrante ha incluido su fichero `evidencias/devops-nombre-apellido.md`.
