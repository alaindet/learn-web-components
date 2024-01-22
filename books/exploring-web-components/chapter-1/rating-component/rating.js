// Adapted from
// https://github.com/andychiare/rating-component/blob/master/myRating.js

const HTML_ENTITY = {
  STAR_EMPTY: '&#x2606;', // ☆
  STAR_FILLED: '&#x2605;', // ★
};

const INPUT = {
  MAX_VALUE: 5,
  VALUE: 0,
};

const TEMPLATE = {
  ROOT: createTemplate(`
    <style>
      .rating {
        color: orange;
        cursor: pointer;
      }
      .rating:hover {
        color: black;
      }
    </style>
    <slot name='label'><i>Give your rating</i></slot>
    <div id='root'></div>
  `),
  STAR: createTemplate(`
    <span class='rating'></span>
  `),
};

class MyRatingComponent extends HTMLElement {

  constructor() {
    super();
    this._maxValue = INPUT.MAX_VALUE;
    this._value = INPUT.VALUE;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(TEMPLATE.ROOT.content.cloneNode(true));
  }

  get maxValue() {
    return this._maxValue;
  }

  set maxValue(val) {
    this._maxValue = val;
    this.setAttribute('max-value', val);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.setAttribute('value', val);
  }

  static get observedAttributes() {
    return ['max-value', 'value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {

    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case 'max-value':
        this._maxValue = newValue;
        break;
      case 'value':
        this._value = newValue;
        break;
    }

    this.#replaceStarList();
  }

  connectedCallback() {
    this.#createStarList();
  }

  #createStarList() {
    const div = this.shadowRoot.getElementById('root');
    div.innerHTML = '';

    const filledIcon = HTML_ENTITY.STAR_FILLED;
    const emptyIcon = HTML_ENTITY.STAR_EMPTY;

    for (let i = 1; i <= this.maxValue; i++) {
      const starHtmlEntity = (i <= this.value) ? filledIcon : emptyIcon;
      div.appendChild(this.#createStar(starHtmlEntity, i));
    }

    return div;
  }

  #replaceStarList() {
    let starNode = this.shadowRoot.getElementById('root');

    if (starNode) {
      this.#createStarList();
    }
  }

  #createStar(starCode, index) {
    const starNode = TEMPLATE.STAR.content.cloneNode(true);
    const span = starNode.querySelector('span');

    span.addEventListener('click', () => {
      this.setAttribute('value', index);
    });
    span.innerHTML = starCode;

    return span;
  }
}

customElements.define('my-rating', MyRatingComponent);

// TODO: Move to utils
function createTemplate(templateString) {
  const template = document.createElement('template');
  template.innerHTML = templateString;
  return template;
}
