class SecureLinkComponent extends HTMLAnchorElement {

  // https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
  connectedCallback() {
    this.addEventListener('click', this.#onClick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick.bind(this));
  }

  #onClick(event) {
    if (this.href.startsWith('https')) {
      return;
    }

    const confirmed = confirm('You are about to navigate to an unsafe site. Do you want to continue?');

    if (!confirmed) {
      event.preventDefault();
    }
  }
}

customElements.define(
  'app-secure-link',
  SecureLinkComponent,
  { extends: 'a' },
);
