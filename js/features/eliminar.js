import { deleteTarea } from "../store.js";

export function activarEliminar(render) {
  const lista = document.querySelector("#task-list");

  // delegacion de eventos: un solo listener en la lista
  lista.addEventListener("click", (e) => {
    const boton = e.target.closest("button");

    // actuar solo si es el boton de eliminar
    if (!boton || boton.dataset.action !== "delete") return;

    // id numerico del li que contiene el boton
    const id = Number(boton.closest("li").dataset.id);

    deleteTarea(id);
    render();
  });
}