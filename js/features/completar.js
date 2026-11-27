export function activarCompletar(render) {
  const taskList = document.querySelector('#task-list');
  
  taskList.addEventListener('click', (event) => {
    const boton = event.target.closest('[data-action="complete"]');
    if (!boton) return;

    const liElement = boton.closest('li');
    if (!liElement) return;

    const id = parseInt(liElement.dataset.id);
    toggleTarea(id);
    render();
  });
}   