import { Component, h, Method, Prop, State } from '@stencil/core';

import { SideDrawerTab } from './side-drawer-tab.model';

@Component({
  tag: 'my-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {

  @Prop({ reflect: true }) heading: string;
  @Prop({ reflect: true, mutable: true }) isOpen: boolean;
  @State() currentTab: SideDrawerTab = SideDrawerTab.Navigation;

  onCloseDrawer(): void {
    this.close();
  }

  onContentChange(tab: SideDrawerTab): void {
    this.currentTab = tab;
  }

  @Method() async open(): Promise<void> {
    this.isOpen = true;
  }

  @Method() async close(): Promise<void> {
    this.isOpen = false;
  }

  private getSideDrawerContent(tab: SideDrawerTab): any {
    switch (tab) {
      case SideDrawerTab.Navigation:
        return <slot />;
      case SideDrawerTab.ContactUs:
        return (
          <div id="contact-us">
            <h2>Contact Us</h2>
            <p>You can reach us via phone or email</p>
            <ul>
              <li>Phone: 555-123-456</li>
              <li><a href="mailto:foo@bar.com">foo@bar.com</a></li>
            </ul>
          </div>
        );
    }
  }

  render() {

    const mainContent = this.getSideDrawerContent(this.currentTab);

    return (
      <aside>
        <header>
          <h1>{this.heading}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>Close</button>
        </header>
        <section id="tabs">
          <button
            onClick={() => this.onContentChange(SideDrawerTab.Navigation)}
            class={this.currentTab === SideDrawerTab.Navigation ? 'active' : ''}
          >
            Navigation
          </button>
          <button
            onClick={() => this.onContentChange(SideDrawerTab.ContactUs)}
            class={this.currentTab === SideDrawerTab.ContactUs ? 'active' : ''}
          >
            Contact
          </button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    );
  }
}
