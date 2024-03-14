import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-radio',
  styleUrl: './my-radio.component.css',
  // shadow: true,
})
export class MyRadioComponent {

  @Prop() value!: string;

  @Prop() checked = false;

  render() {
    return (
      <Host class="my-radio">
        {this.checked ? '[X]' : '[ ]'}
        <slot></slot>
      </Host>
    );
  }
}
