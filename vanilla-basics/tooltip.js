class MyTooltip extends HTMLElement {

  static get observedAttributes() {
    return ['text'];
  }

  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipIcon;
    this._tooltipText = 'Default tooltip text';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>

        /* The host aka "my-tooltip" */
        :host {
          border-bottom: 1px dashed #8080ff;
          padding: 0 0.5rem;
        }

        /* Applies only when host has "color" attribute equals to "primary" */
        :host([color="primary"]) {
          color: var(--color-primary, green);
          border-color: var(--color-primary, green);
        }

        /* Applies only when the parents match the CSS selector */
        :host-context(section[weight-bold]) {
          border-bottom: 3px solid black;
          font-weight: bold;
        }

        /* Applies to all slotted content */
        ::slotted(*) {
          font-style: italic;
        }

        /* The tooltip */
        div {
          font-weight: normal;
          background-color: white;
          border: 1px dashed #8080ff;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
          position: absolute;
          top: 1.5rem;
          left: 0.5rem;
          padding: 0.25rem 0.5rem;
          z-index: 2;
        }

        /* The icon */
        .icon {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 1rem;
          height: 1rem;
          font-size: 0.9rem;
          color: #8080ff;
          font-weight: bold;
        }
      </style>
      <slot>Default tooltip</slot>
      <span class="icon">?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.style.position = 'relative';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter');
    this._tooltipIcon.removeEventListener('mouseleave');
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('my-tooltip', MyTooltip);
