const style = `
  cookie-alert {
    --_background: var(--background, rgb(35, 122, 252));
    --_color: var(--color, rgb(255, 255, 255));
  }

  .container {
    color: var(--_color);
    background-color: var(--_background);
    padding: 1em 1.8em;
    width: 100%;
    font-family: Helvetica,Calibri,Arial,sans-serif;
  }

  .footer {
    position:fixed;
    left:0px;
    bottom:0px;
  }
`;

const template = `
  <div class='container footer'>
    <span>
      This website uses cookies to ensure you get the best experience
    </span>
  </div>
`;

class CookieAlert extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.createComponentViaInnerHTML();
    // this.createComponentProgrammatically();
  }

  createComponentViaInnerHTML() {
    this.innerHTML = `<style>${style}</style>${template}`;
  }

  // This is very verbose!!!
  createComponentProgrammatically() {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(style));
    this.appendChild(styleElement);

    console.log(styleElement);

    const spanElement = document.createElement('span');
    spanElement.innerText = 'This website uses cookies to ensure you get the best experience';
    const divElement = document.createElement('div');
    divElement.classList.add('container', 'footer');
    divElement.appendChild(spanElement);
    this.appendChild(divElement);
  }
}

customElements.define('cookie-alert', CookieAlert);
