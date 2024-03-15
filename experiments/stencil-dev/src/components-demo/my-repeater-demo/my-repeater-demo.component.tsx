import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'my-repeater-demo',
})
export class MyRepeaterDemoComponent {

  @State() times = '1';

  onIncrementTimes() {
    let n = +this.times;
    n++;
    this.times = n.toString();
  }

  render() {
    return (
      <section>
        <h2>My Repeater</h2>
        <button onClick={() => this.onIncrementTimes()}>+1</button>
        <my-repeater times={this.times.toString()}>
          <p>Hello World</p>
        </my-repeater>
      </section>
    );
  }
}
