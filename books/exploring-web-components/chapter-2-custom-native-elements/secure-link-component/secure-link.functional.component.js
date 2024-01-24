// This is functionally equivalent to secure-link.component.ts
// THIS IS HIGHLY DISCOURAGED

function SecureLink() {
  return Reflect.construct(HTMLAnchorElement, [], this.constructor);
}

SecureLink.prototype = Object.create(HTMLAnchorElement.prototype);
SecureLink.prototype.constructor = SecureLink;
Object.setPrototypeOf(SecureLink, HTMLAnchorElement);

SecureLink.prototype.connectedCallback = function() {
  this.addEventListener('click', event => {

    if (this.href.startsWith('https')) {
      return;
    }

    const confirmed = confirm('You are about to navigate to an unsafe site. Do you want to continue?');

    if (!confirmed) {
      event.preventDefault();
    }
  });
}

customElements.define('fn-secure-link', SecureLink, {
  extends: 'a',
});
