import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-badge',
  styleUrl: './my-badge.component.css',
  shadow: true,
})
export class MyBadgeComponent {

  @Prop() type: 'success' | 'info' | 'error' = 'info';

  render() {
    const className = `type-${this.type}`;

    return (
      <Host class={className}>
        <slot></slot>
      </Host>
    );
  }
}
