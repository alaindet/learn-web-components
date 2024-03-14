import { Component, Host, Prop, State, Element, h } from '@stencil/core';

// TODO: Move
function didPropOrStateChange<T = any>(targetPropName: string) {
  return (propName: string, prev: T, next: T) => {
    if (targetPropName !== propName) {
      return false;
    }

    return prev !== next;
  };
}

@Component({
  tag: 'my-radio-group',
  styleUrl: './my-radio-group.component.css',
  // shadow: true,
})
export class MyRadioGroupComponent {

  @Element()
  el!: HTMLElement;

  @Prop() checked = false;
  #didCheckedPropChange = didPropOrStateChange<boolean>('checked');

  @State() checkedState = false;

  connectedCallback() {
    this.#syncCheckedState();
    this.#queryChildRadios();
  }

  componentShouldUpdate?(next: any, prev: any, propName: string): boolean | void {
    if (this.#didCheckedPropChange(propName, prev, next)) {
      this.#syncCheckedState();
    }
  }

  #syncCheckedState(): void {
    if (this.checked != this.checkedState) {
      this.checkedState = this.checked;
    }
  }

  #queryChildRadios() {
    const radios = this.el.querySelectorAll('my-radio');
    console.log('queried radios', radios);
    // radios.forEach(radio => radio.checked = true);
  }

  render() {
    return (
      <Host class="my-radio-group">
        <slot></slot>
      </Host>
    );
  }
}
