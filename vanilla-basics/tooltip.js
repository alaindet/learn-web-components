class MyTooltip extends HTMLElement {

  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Default tooltip text';
  }

  connectedCallback() {
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define('my-tooltip', MyTooltip);
