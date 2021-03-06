class MyModal extends HTMLElement {

  static get observedAttributes() {
    return ['opened'];
  }

  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }
        #backdrop {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0,0,0,0.5);
          z-index: 2;
          transition: 0.2s opacity ease-in-out;

          /* Hide  by default */
          pointer-events: none;
          opacity: 0;
        }
        #modal {
          position: fixed;
          z-index: 3;
          max-width: 100%;
          width: 500px;
          background-color: white !important;
          left: 50%;
          transform: translateX(-50%);
          top: 20%;
          box-shadow: 3px 3px 7px rgba(0,0,0,0.5);
          padding: 1rem;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          transition: 0.2s opacity ease-in-out;

          /* Hide  by default */
          pointer-events: none;
          opacity: 0;
        }
        #modal-header {
          border-bottom: 1px solid #ccc;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }
        ::slotted(h1) {
          margin: 0;
          font-size: 1.5rem;
        }
        #modal-body {
          flex-grow: 1;
          padding: 1rem 0;
        }
        #modal-footer {
          border-top: 1px solid #ccc;
          margin-top: 1rem;
          padding-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        #modal-footer button {
          margin: 0 1rem;
          padding: 0.5rem 1rem;
        }
      </style>

      <div id="backdrop"></div>

      <div id="modal">
        <header id="modal-header">
          <slot name="title">
            <h1>Default title</h1>
          </slot>
        </header>
        <section id="modal-body">
          <slot></slot>
        </section>
        <footer id="modal-footer">
          <button id="cancel-button">Cancel</button>
          <button id="confirm-button">Confirm</button>
        </footer>
      </div>
    `;
    const cancelButton = this.shadowRoot.querySelector('#cancel-button');
    const confirmButton = this.shadowRoot.querySelector('#confirm-button');
    const backdrop = this.shadowRoot.querySelector('#backdrop');
    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
    backdrop.addEventListener('click', this._cancel.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.isOpen = this.hasAttribute('opened');
  }

  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
      this.isOpen = false;
    }
  }

  _cancel () {
    this.hide();
    const cancelEvent = new Event('my-modal-cancel');
    this.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();
    const confirmEvent = new Event('my-modal-confirm');
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define('my-modal', MyModal);
