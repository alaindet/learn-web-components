import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'my-radio-demo',
  styleUrl: './my-radio-demo.component.css',
  // shadow: true,
})
export class MyRadioDemoComponent {

  @Element()
  el!: HTMLElement;

  handleSelected = (data: any) => {
    console.log('handleSelected', data);
  };

  render() {
    return (
      <section>
        <h2>My Radio Group</h2>
        <fieldset>
          <my-radio-group name="person">
            <my-radio value="foo">Foo</my-radio>
            <my-radio value="bar">Bar</my-radio>
            <my-radio value="baz">Baz</my-radio>
          </my-radio-group>
        </fieldset>
      </section>
    );
  }
}
