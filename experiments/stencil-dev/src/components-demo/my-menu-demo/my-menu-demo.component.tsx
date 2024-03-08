import { Component, h, Element } from '@stencil/core';

import { MyMenuOption } from '../../components/my-menu';

const MY_MENU_OPTIONS: MyMenuOption[] = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
  { value: 'baz', label: 'Baz' },
];

@Component({
  tag: 'my-menu-demo',
  styleUrl: './my-menu-demo.component.css',
  // shadow: true,
})
export class MyMenuDemoComponent {

  @Element()
  el!: HTMLElement;

  handleSelected = (data: any) => {
    console.log('handleSelected', data);
  };

  render() {
    return (
      <section>
        <h2>My Menu</h2>
        <my-menu
          options={MY_MENU_OPTIONS}
          onSelected={this.handleSelected}
        ></my-menu>
      </section>
    );
  }
}
