import { getCookie, setCookie } from './utils';

const style = `
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(255, 255, 255);
    background-color: rgb(35, 122, 252);
    padding: 1em 1.8em;
    font-family: Helvetica, Calibri, Arial, sans-serif;
    transition: all 0.15s ease-in-out;
  }

  .container:hover {
    background-color: rgb(29, 100, 207);
  }

  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .message {
    flex-grow: 1;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .button {
    --_background: var(--button-background, black);
    --_color: var(--button-color, white);
    --_border: var(--button-border, black);

    color: var(--_color);
    background-color: var(--_background);
    border: 2px solid var(--_border);
    border-radius: 4px;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.1s ease-out;
  }

  .button.primary {
    --_background: rgb(252, 206, 88);
    --_color: black;
    --_border: var(--_background);
  }

  .button.primary:hover {
    --_background: rgb(232, 182, 53);
  }

  .button.secondary {
    --_background: transparent;
    --_color: white;
    --_border: white;
  }

  .button.secondary:hover {
    --_background: white;
    --_color: black;
    --_border: white;
  }
`;

class CookieAlert extends HTMLElement {

  #acceptedEvent = () => this.dispatchEvent(new CustomEvent('accepted'));

  #afterRender = null;
  #message = 'This website uses cookies to ensure you get the best experience';

  static observedAttributes = ['message'];

  get message() {
    return this.#message
  }

  set message(value) {
    this.#message = value;
    this.setAttribute('message', value);
    this.#renderMessage(value);
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, prevValue, nextValue) {
    if (prevValue === nextValue) {
      return;
    }

    switch (name) {
      case 'message':
        this.message = nextValue;
        break;
    }
  }

  connectedCallback() {
    this.#afterRender = () => {
      const dismiss = this.querySelector('.dismiss');
      const dismissHandler = this.#onDismiss.bind(this);
      dismiss.removeEventListener('click', dismissHandler);
      dismiss.addEventListener('click', dismissHandler);

      const accept = this.querySelector('.accept');
      const acceptHandler = this.#onAccept.bind(this);
      accept.removeEventListener('click', acceptHandler);
      accept.addEventListener('click', acceptHandler);
    };

    this.#render();
  }

  #html() {
    const message = this.getAttribute('message');
    if (message) {
      this.#message = message;
    }

    const accepted = getCookie('cookiesAccepted');
    if (accepted === 'y') {
      this.style.visibility = 'hidden';
      return null;
    }

    return `
      <style>${style}</style>
      <div class="container footer">
        <span class="message">${this.message}</span>
        <div class="controls">
          <button type="button" class="button secondary dismiss">Close</button>
          <button type="button" class="button primary accept">Accept</button>
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    const dismiss = this.querySelector('.dismiss');
    const dismissHandler = this.#onDismiss.bind(this);
    dismiss.removeEventListener('click', dismissHandler);

    const accept = this.querySelector('.accept');
    const acceptHandler = this.#onAccept.bind(this);
    accept.removeEventListener('click', acceptHandler);
  }

  #renderMessage(value) {
    this.querySelector('.message').innerText = value;
  }

  #onDismiss() {
    this.style.visibility = 'hidden';
  }

  #onAccept() {
    setCookie('cookiesAccepted', 'y', 365);
    this.style.visibility = 'hidden';
    this.#acceptedEvent();
  }

  #render() {
    const rendered = this.#html();
    if (!rendered) {
      return;
    }

    this.innerHTML = rendered;

    if (this.#afterRender) {
      this.#afterRender();
    }
  }
}

customElements.define('cookie-alert', CookieAlert);
