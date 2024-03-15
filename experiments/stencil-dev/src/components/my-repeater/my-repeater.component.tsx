import { Component, Host, Prop, Element, h, Watch } from '@stencil/core';

@Component({
  tag: 'my-repeater',
})
export class MyRepeaterComponent {

  @Element() host!: HTMLElement;

  @Prop() times = '1';

  #content!: string;
  #multiplier!: number;

  @Watch('times')
  updateMultiplier() {
    this.#updateMultiplier();
  }

  connectedCallback() {
    this.#content = this.host.innerHTML;
    this.#updateMultiplier();
  }

  #updateMultiplier() {
    const times = parseInt(this.times, 10);
    if (isNaN(times)) {
      throw new Error('"times" prop must be a valid numeric string');
    }
    this.#multiplier = times;
  }

  render() {
    return (
      <Host class="my-repeater" innerHTML={this.#content.repeat(this.#multiplier)}>
        <slot></slot>
      </Host>
    );
  }
}
