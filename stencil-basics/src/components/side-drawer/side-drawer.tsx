import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-side-drawer',
  styleUrl: './side-drawer.css',
  // scoped: true, // Scope CSS without shadow DOM
  shadow: true,
})
export class SideDrawer {

  @Prop({ reflect: true }) heading: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer(): void {
    this.open = false;
  }

  render() {

    const mainContent = <slot />;

    return (
      <aside>
        <header>
          <h1>{this.heading}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>Close</button>
        </header>
        <section id="tabs">
          <button>Navigation</button>
          <button>Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    );
  }
}
