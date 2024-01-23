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

const template = `
  <div class="container footer">
    <span class="message">%MESSAGE%</span>
    <div class="controls">
      <button type="button" class="button secondary dismiss">Close</button>
      <button type="button" class="button primary accept">Accept</button>
    </div>
  </div>
`;

class CookieAlert extends HTMLElement {

  #message = 'This website uses cookies to ensure you get the best experience';

  static observedAttributes = ['message'];

  get message() {
    return this.#message
  }

  set message(value) {
    this.#message = value;
    this.setAttribute('message', value);
    this.#updateMessage(value);
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

  constructor() {
    super();

    // Example: Prevent any standard "click" event handler to be added to
    // <cookie-alert> element
    this.addEventListener('click', event => event.stopImmediatePropagation());
  }

  connectedCallback() {
    const message = this.getAttribute('message');
    if (message) {
      this.#message = message;
    }

    this.#createComponentViaInnerHTML();

    this.querySelector('.dismiss')
      .addEventListener('click', this.#onDismiss.bind(this));

    this.querySelector('.accept')
      .addEventListener('click', this.#onAccept.bind(this));
  }

  disconnectedCallback() {
    this.querySelector('.dismiss')
      .removeEventListener('click', this.#onDismiss.bind(this));

    this.querySelector('.accept')
      .removeEventListener('click', this.#onAccept.bind(this));
  }

  #createComponentViaInnerHTML() {
    this.innerHTML = `
      <style>${style}</style>
      ${template.replace(`%MESSAGE%`, this.message)}
    `;
  }

  #updateMessage(value) {
    this.querySelector('.message').innerText = value;
  }

  #onDismiss() {
    this.style.visibility = 'hidden';
  }

  #onAccept() {
    setCookie('cookiesAccepted', 'y', 365);
    this.style.visibility = 'hidden';
  }
}

customElements.define('cookie-alert', CookieAlert);

// TODO: Move
function setCookie(cookieName, cookieValue, expiresInDays) {

  const date = addDays(new Date(), expiresInDays);
  const expiration = date.toUTCString();

  document.cookie = [
    `${cookieName}=${cookieValue}`,
    `expires=${expiration}`,
    `path=/`,
  ].join(';');
}

// TODO: Move
function getCookie(cookieName) {
  // ...
}

// TODO: Move
function addDays(date, days) {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const timeIntervalInMilliseconds = days * millisecondsInDay;
  date.setTime(date.getTime() + timeIntervalInMilliseconds);
  return date;
}
