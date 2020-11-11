class MyVisibilityToggle extends HTMLElement {

  constructor() {
    super();
    this._isVisible = true;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          border: 1px solid #8080ff;
          padding: 1rem;
        }
        #toggle {
          background-color: transparent;
          border: 2px solid black;
          padding: 0.5rem 1rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: 0.15s background-color ease-in-out;
        }
        #toggle:hover {
          background-color: black;
          color: white;
        }
        #toggle:focus {
          outline: none;
          border-color: #ccc;
        }
      </style>
      <button id="toggle" type="button">Hide</button>
      <span id="content">
        <slot>Toggleable content</slot>
      </span>
    `;
    this._toggle = this.shadowRoot.querySelector('#toggle');
    this._content = this.shadowRoot.querySelector('#content');
    this._toggle.addEventListener('click', (e) => this._toggleVisibility(e));
  }

  connectedCallback() {
    if (this.hasAttribute('visible') && this.getAttribute('visible') === 'false') {
      this._toggleVisibility();
    }
  }

  _toggleVisibility() {
    this._toggle.textContent = this._isVisible ? 'Show' : 'Hide';
    this._content.style.display = this._isVisible ? 'none' : 'initial';
    this._isVisible = !this._isVisible;
  }
}

customElements.define('my-visibility-toggle', MyVisibilityToggle);
