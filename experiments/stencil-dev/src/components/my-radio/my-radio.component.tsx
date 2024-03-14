import { Component, Host, Prop, Element, h, Method } from '@stencil/core';

// TODO: Move
function getRandomHash(len = 3): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letters: string[] = [];

  for (let i = 0; i < len; i++) {
    letters.push(alphabet[i]);
  }

  return letters.join('');
}

// TODO: Move
function getUniqueId(id?: string, prefix = ''): string {
  if (id) {
    return id;
  }
  if (prefix) {
    return `${prefix}-${getRandomHash()}`;
  }
  return getRandomHash();
}

@Component({
  tag: 'my-radio',
  styleUrl: './my-radio.component.css',
  // shadow: true,
})
export class MyRadioComponent {

  @Element() host: HTMLElement;

  @Prop() value!: string;
  @Prop() checked = false;

  #id!: string;
  #name!: string;

  componentDidLoad() {
    this.#id = getUniqueId(this.host.getAttribute('id'), 'my-radio');
    this.#name = this.host.getAttribute('name');
  }

  @Method()
  async setName(name: string) {
    this.#name = name;
  }

  render() {
    return (
      <Host class="my-radio" id={this.#id}>
        <input type="radio" name={this.#name} id={this.#id} checked={this.checked} />
        <label htmlFor={this.#id}><slot></slot></label>
      </Host>
    );
  }
}
