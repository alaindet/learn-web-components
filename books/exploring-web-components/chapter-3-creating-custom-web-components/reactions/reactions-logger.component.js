// Adapter from
// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
class ReactionsLogger extends HTMLElement {

  static observedAttributes = ['foo', 'bar'];

  constructor() {
    console.log('#1 ReactionsLogger.constructor');
    super();
  }

  connectedCallback() {
    console.log('#3 ReactionsLogger.connectedCallback');
    this.#render();
  }

  disconnectedCallback() {
    console.log('#5 ReactionsLogger.disconnectedCallback');
  }

  adoptedCallback() {
    console.log('#4 (optional) ReactionsLogger.adoptedCallback');
  }

  // This is guaranteed to run at least once if the attribute is provided an
  // initial value in the template
  //
  // Ex.:
  // <reaction-logger foo=1></reaction-logger>
  // ^^^ This triggers attributeChangedCallback
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('#2 (optional) ReactionsLogger.attributeChangedCallback', {
      name,
      oldValue,
      newValue,
    });

    if (oldValue !== newValue) {
      this.#render();
    }
  }

  #render() {
    const foo = this.getAttribute('foo');
    const bar = this.getAttribute('bar');
    this.innerHTML = `
      <p>This component logs lifecycle hooks of a web component</p>
      <ul>
        <li>Foo: ${foo}</li>
        <li>Bar: ${bar}</li>
      </ul>
    `;
  }
}

customElements.define('reactions-logger', ReactionsLogger);
