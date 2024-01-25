export function createEventListenersController() {
  const eventListeners = [];

  function add(element, event, handler) {
    eventListeners.push({ element, event, handler });
  }

  function removeAll() {
    for (const { element, event, handler } of eventListeners) {
      element.removeEventListener(event, handler);
    }
  }

  return {
    add,
    removeAll,
  };
}
