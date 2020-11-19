import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-side-drawer',
  styleUrl: './side-drawer.css',
  // scoped: true, // Scope CSS without shadow DOM
  shadow: true,
})
export class SideDrawer {

  @Prop({ reflect: true }) heading: string;

  render() {
    return (
      <aside>
        <header>
          <h1>{this.heading}</h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
