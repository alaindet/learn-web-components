class MyConfirmLink extends HTMLAnchorElement {

  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Are you sure?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('my-confirm-link', MyConfirmLink, { extends: 'a' });
