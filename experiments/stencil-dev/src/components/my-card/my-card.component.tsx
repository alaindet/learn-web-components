import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.component.css',
  shadow: true,
})
export class MyCardComponent {
  render() {
    return (
      <Host>
        <div class="my-card__header">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </div>
        <div class="my-card__body">
          <slot></slot>
        </div>
        <div class="my-card__footer">
          <slot name="footer"></slot>
        </div>
      </Host>
    );
  }
}
