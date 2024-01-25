import { Component, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';

export type MenuOption = {
  label: string;
  value: string;
};

@Component({
  tag: 'my-menu',
  styleUrl: './my-menu.component.css',
  shadow: true,
})
export class MyMenuComponent {

  // TODO
  @Prop() options: MenuOption[] = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
    { value: 'baz', label: 'Baz' },
  ];

  @Event() pickedOption: EventEmitter<MenuOption['value']>;

  @State() open = false;

  // TODO: Use @Watch?
  @State() facadeLabel = 'Open';

  private handleFacadeClick = () => {
    this.open = !this.open;
    this.facadeLabel = this.open ? 'Close' : 'Open';
  }

  handleOptionClicked(option: MenuOption) {
    this.pickedOption.emit(option.value);
    this.open = false;
    this.facadeLabel = this.open ? 'Close' : 'Open';
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
