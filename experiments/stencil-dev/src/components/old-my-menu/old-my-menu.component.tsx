import { Component, Host, Prop, State, Event, EventEmitter, h, Watch, Method, Element, Listen } from '@stencil/core';

export type MenuOption = {
  label: string;
  value: string;
};

@Component({
  tag: 'old-my-menu',
  styleUrl: './old-my-menu.component.css',
  shadow: true,
})
export class OldMyMenuComponent {

  @Prop() options: MenuOption[] = [];
  @Event() pickedOption: EventEmitter<MenuOption['value']>;

  @State() private open = false;
  @State() private facadeLabel = 'Open';

  @Element() private el: HTMLElement;

  private closeOnClickOutController: AbortController | null = null;

  @Watch('open')
  watchOpen(open: boolean) {
    this.updateFacadeLabel(open);

    if (open) {
      this.initCloseOnClickOut();
    } else {
      this.removeCloseOnClickOut();
    }
  }

  private updateFacadeLabel(open: boolean): void {
    this.facadeLabel = open ? 'Close' : 'Open';
  }

  private initCloseOnClickOut(): void {
    this.closeOnClickOutController = new AbortController();
    document.addEventListener('click', event => {
      if (this.open && !this.el.contains(event.target as HTMLElement)) {
        this.open = false;
      }
    }, { signal: this.closeOnClickOutController.signal });
  }

  private removeCloseOnClickOut(): void {
    this.closeOnClickOutController.abort();
  }

  @Method()
  async openDropdown(): Promise<void> {
    this.open = true;
  }

  @Method()
  async closeDropdown(): Promise<void> {
    this.open = false;
  }

  @Method()
  async toggleDropdown(): Promise<void> {
    this.open = !this.open;
  }

  @Method()
  async getDimensions(): Promise<string> {
    const rect: DOMRect = this.el.getBoundingClientRect();
    const { width, height } = rect;
    return `${width}x${height}`;
  }

  // That's neat but listens to all document clicks
  // @Listen('click', { target: 'document' })
  // listenToDocumentClick(event: MouseEvent) {
  //   if (this.open && !this.el.contains(event.target as HTMLElement)) {
  //     this.open = false;
  //     console.log('Captured global click', event.target);
  //   } else {
  //     console.log('Ignore global click', event.target);
  //   }
  // }

  @Listen('keydown')
  listenToKeydown(event: KeyboardEvent) {
    console.log('listenToKeydown', event.target);
  }

  private handleFacadeClick = () => {
    this.open = !this.open;
  }

  handleOptionClicked(option: MenuOption) {
    this.pickedOption.emit(option.value);
    this.open = false;
  }

  render() {
    return (
      <Host class="menu">
        <button type="button" onClick={this.handleFacadeClick.bind(this)}>
          {this.facadeLabel}
        </button>

        {this.open && (
          <div class="panel">
            <ul>
              {this.options.map(option => (
                <li key={option.value}>
                  <button type="button" onClick={() => this.handleOptionClicked(option)}>
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Host>
    );
  }
}
