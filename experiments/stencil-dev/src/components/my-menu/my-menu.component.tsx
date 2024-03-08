import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { MyMenuOption } from './types';

@Component({
  tag: 'my-menu',
  styleUrl: './my-menu.component.css',
  // shadow: true,
})
export class MyMenuComponent {

  @Element()
  el!: HTMLElement;

  @Prop()
  options!: MyMenuOption[];

  @Event({ bubbles: true, composed: true })
  selected: EventEmitter<string>;

  private handleSelectOption(option: MyMenuOption): void {
    this.selected.emit(option.value);
  }

  render() {
    return (
      <Host class="my-menu" role="menu">
        <ul class="my-menu-options">
          {this.options.map(option => (
            <li key={option.value} class="my-menu-option" role="presentation">
              <button
                type="button"
                onClick={() => this.handleSelectOption(option)}
                role="menuitem"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
