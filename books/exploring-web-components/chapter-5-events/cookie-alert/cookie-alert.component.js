import { getCookie, setCookie } from './utils';

const COOKIE = Object.freeze({
  NAME: 'cookies-accepted',
  VALUE: 'yes',
  EXPIRES_IN_DAYS: 30,
});

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

export const COOKIE_ALERT_ATTR_MESSAGE = 'message';
export const COOKIE_ALERT_ATTR_ONACCEPTED = 'onaccepted';
export const COOKIE_ALERT_EVENT_ACCEPTED = 'accepted';

class CookieAlert extends HTMLElement {

  #message = 'This website uses cookies to ensure you get the best experience';
  #onAcceptedListener = null;
  #acceptedEvent = () => this.dispatchEvent(new CustomEvent(COOKIE_ALERT_EVENT_ACCEPTED, {
    detail: {
      acceptedCookieName: COOKIE.NAME,
      acceptedCookieExpiration: COOKIE.EXPIRES_IN_DAYS,
    },
  }));

  // Internal API
  #afterRender = null;

  // Internal API
  #eventListeners = [];

  static observedAttributes = [
    COOKIE_ALERT_ATTR_MESSAGE,
    COOKIE_ALERT_ATTR_ONACCEPTED,
  ];

  get message() {
    return this.#message
  }

  set message(value) {
    this.#message = value;
    this.setAttribute(COOKIE_ALERT_ATTR_MESSAGE, value);
    this.#renderMessage(value);
  }

  get onaccepted() {
    return this.#onAcceptedListener;
  }

  set onaccepted(handler) {
    if (this.#onAcceptedListener) {
      this.removeEventListener(COOKIE_ALERT_EVENT_ACCEPTED, this.#onAcceptedListener);
    }
    if (typeof handler === 'function') {
      this.#onAcceptedListener = handler;
      this.addEventListener(COOKIE_ALERT_EVENT_ACCEPTED, this.#onAcceptedListener);
    }
  }

  constructor() {
    super();
  }

  // Built-in callback
  attributeChangedCallback(name, prevValue, nextValue) {

    if (prevValue === nextValue) {
      return;
    }

    switch (name) {
      case COOKIE_ALERT_ATTR_MESSAGE:
        this.message = nextValue;
        break;
      case COOKIE_ALERT_ATTR_ONACCEPTED:
        if (nextValue) {
          // This is a monstrosity
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function
          this.onaccepted = new Function('event', `${nextValue}`);
        } else {
          this.onaccepted = null;
        }
        break;
    }
  }

  // Built-in callback
  connectedCallback() {
    this.#afterRender = () => {
      this.#removeEventListeners();
      this.#addEventListener(this.querySelector('.dismiss'), 'click', this.#onDismiss.bind(this));
      this.#addEventListener(this.querySelector('.accept'), 'click', this.#onAccept.bind(this));
    };

    this.#render();
  }

  #html() {
    const message = this.getAttribute(COOKIE_ALERT_ATTR_MESSAGE);
    if (message) {
      this.#message = message;
    }

    const accepted = getCookie(COOKIE.NAME);
    if (accepted === COOKIE.VALUE) {
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

  // Built-in callback
  disconnectedCallback() {
    this.#removeEventListeners();
  }

  #renderMessage(value) {
    const messageEl = this.querySelector('.message');
    if (messageEl) {
      messageEl.innerText = value;
    }
  }

  #onDismiss() {
    this.style.visibility = 'hidden';
  }

  #onAccept() {
    this.style.visibility = 'hidden';
    setCookie(COOKIE.NAME, COOKIE.VALUE, COOKIE.EXPIRATION_IN_DAYS);
    this.#acceptedEvent();
    if (this.#onAcceptedListener) {
      this.#onAcceptedListener();
    }
  }

  // Internal API
  #render() {
    const rendered = this.#html();

    if (rendered) {
      this.innerHTML = rendered;
    }

    if (this.#afterRender) {
      this.#afterRender();
    }
  }

  // Internal API
  #addEventListener(el, event, handler) {
    if (!el) {
      return;
    }
    this.#eventListeners.push({ el, event, handler });
    el.addEventListener(event, handler);
  }

  // Internal API
  #removeEventListeners() {
    this.#eventListeners.forEach(({ el, event, handler }) => {
      el.removeEventListener(event, handler);
    });
    this.#eventListeners = [];
  }
}

customElements.define('cookie-alert', CookieAlert);
