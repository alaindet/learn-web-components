import { createEventListenersController } from './utils';

const css = `
  <style>
    :host {
      --color-text: black;
      --color-background: #ddd;
      --button-color-background: black;
      --button-color-background-hover: #333;
      --button-color-border: transparent;
      --button-color-border-hover: transparent;
      --button-color-text: white;
      --button-color-text-hover: white;
    }

    .cookie-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--color-text);
      background-color: var(--color-background);
      padding: 1em 1.8em;
      transition: all 0.15s ease-in-out;
    }

    .left {
      flex-grow: 1;
    }

    .reference {
      font-size: 0.9em;
      font-style: italic;
    }

    .button {
      color: var(--button-color-text);
      background-color: var(--button-color-background);
      border: 2px solid var(--button-color-border);
      border-radius: 4px;
      padding: 0.5rem 1.5rem;
      cursor: pointer;
      transition: background-color 0.1s ease-out;
    }

    .button:hover {
      background-color: var(--button-color-background-hover);
      border-color: var(--button-color-border-hover);
      color: var(--button-color-text-hover);
    }
  </style>
`;

const html = `
  <div class="cookie-banner">
    <div class="left">
      <div class="message">
        <slot name="message"></slot>
      </div>
      <div class="footnote">
        <slot name="footnote"></slot>
      </div>
    </div>
    <div class="right">
      <button type="button" class="button dismiss">Close</button>
    </div>
  </div>
`;

const template = document.createElement('template');
template.innerHTML = `${css}${html}`;

customElements.define(
  'cookie-banner',
  class extends HTMLElement {

    #eventListeners = createEventListenersController();

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      const closeButton = this.shadowRoot.querySelector('.dismiss');
      const closeHandler = this.#onDismiss.bind(this);
      closeButton.addEventListener('click', closeHandler);
      this.#eventListeners.add(closeButton, 'click', closeHandler);
    }

    disconnectedCallback() {
      this.#eventListeners.removeAll();
    }

    #onDismiss() {
      this.style.visibility = 'hidden';
      this.dispatchEvent(new CustomEvent('dismissed'));
    }
  },
);
