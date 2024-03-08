import { Component, h } from '@stencil/core';

export type MenuOption = {
  label: string;
  value: string;
};

@Component({
  tag: 'my-badge-demo',
  styleUrl: './my-badge-demo.component.css',
  // shadow: true,
})
export class MyBadgeDemoComponent {
  render() {
    return (
      <section>
        <div>
          <h2>Default badges</h2>
          <my-badge>Default</my-badge>
          <my-badge type="info">Info</my-badge>
          <my-badge type="success">Success</my-badge>
          <my-badge type="error">Error</my-badge>
        </div>

        <div class="custom-badges">
          <h2>Customized badges</h2>
          <my-badge>Default</my-badge>
          <my-badge type="info">Info</my-badge>
          <my-badge type="success">Success</my-badge>
          <my-badge type="error">Error</my-badge>
        </div>
      </section>
    );
  }
}
