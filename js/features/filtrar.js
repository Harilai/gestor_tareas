import { setFiltro } from "../store.js";

export function activarFiltro(render) {
  // Obtenemos el elemento select que permite filtrar las tareas.
  const filter = document.querySelector("#filter");

  // Escuchamos el evento change, que se activa cuando cambia la selección.
  filter.addEventListener("change", (event) => {
    // Guardamos el valor seleccionado (Todas, Pendientes o Completadas).
    setFiltro(event.target.value);

    // Volvemos a renderizar la lista para mostrar las tareas filtradas.
    render();
  });
}