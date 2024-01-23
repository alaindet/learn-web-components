const style = `
  .container {
    color: rgb(255, 255, 255);
    background-color: rgb(35, 122, 252);
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

  #message = 'This website uses cookies to ensure you get the best experience';

  static observedAttributes = [ATTR_MESSAGE];

  get message() {
    return this.#message
  }

  set message(value) {
    this.#message = value;
    this.#updateMessage(value);
    this.setAttribute('message', value);
  }

  attributeChangedCallback(name, prevValue, nextValue) {
    if (prevValue === nextValue) {
      return;
    }

    switch (name) {
      case 'message':
        this.#message = value;
        this.#updateMessage(value);
        break;
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const message = this.getAttribute('message');
    if (message) {
      this.#message = message;
    }

    this.#createComponentViaInnerHTML();
  }

  #createComponentViaInnerHTML() {
    this.innerHTML = `
      <style>${style}</style>
      ${template.replace(`%${'message'}%`, this.message)}
    `;
  }

  #updateMessage(value) {
    this.querySelector('span').innerText = value;
  }
}

customElements.define('cookie-alert', CookieAlert);
