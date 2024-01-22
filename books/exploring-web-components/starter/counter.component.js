class CounterComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.state = {
      counter: 0,
    };

    this.#build();
  }

  #setState(newState) {
    if (newState === this.state) {
      return;
    }

    this.state = newState;
    this.#build();
  }

  #build() {
    this.shadowRoot.innerHTML = this.render(this.state);
    this.postrender(this.state);
  }

  postrender(state) {
    this.shadowRoot.querySelector('button').addEventListener('click', event => {
      console.log('Button clicked');
      this.#setState({
        ...state,
        counter: state.counter + 1,
      });
    });
  }

  render(state) {
    return `
      <p>Counter: ${state.counter}</p>
      <button type="button">+1</button>
    `;
  }
}

customElements.define('app-counter', CounterComponent);
