const ATTR_MESSAGE = 'message';
const ATTR_DEFAULT_MESSAGE = 'This website uses cookies to ensure you get the best experience';

const style = `
  cookie-alert {
    --_background: var(--background, rgb(35, 122, 252));
    --_color: var(--color, rgb(255, 255, 255));
  }

  .container {
    color: var(--_color);
    background-color: var(--_background);
    padding: 1em 1.8em;
    width: 100%;
    font-family: Helvetica,Calibri,Arial,sans-serif;
  }

  .footer {
    position:fixed;
    left:0px;
    bottom:0px;
  }
`;

const template = `
  <div class='container footer'>
    <span>
      %${ATTR_MESSAGE}%
    </span>
  </div>
`;

class CookieAlert extends HTMLElement {

  #message = ATTR_DEFAULT_MESSAGE;

  static get observedAttributes() {
    return [ATTR_MESSAGE];
  }

  get message() {
    return this.#message
  }

  set message(value) {
    this.#message = value;
    this.#updateMessage(value);
    this.setAttribute(ATTR_MESSAGE, value);
  }

  attributeChangedCallback(name, prevValue, nextValue) {
    if (prevValue === nextValue) {
      return;
    }

    switch (name) {
      case ATTR_MESSAGE:
        this.#message = value;
        this.#updateMessage(value);
        // Avoid the setAttribute call because its an expensive DOM operation
        break;
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const message = this.getAttribute(ATTR_MESSAGE);
    if (message) {
      this.#message = message;
    }

    this.#createComponentViaInnerHTML();
    // this.#createComponentProgrammatically();
  }

  #createComponentViaInnerHTML() {
    this.innerHTML = `
      <style>${style}</style>
      ${template.replace(`%${ATTR_MESSAGE}%`, this.message)}
    `;
  }

  #updateMessage(value) {
    this.querySelector('span').innerText = value;
  }
}

customElements.define('cookie-alert', CookieAlert);
