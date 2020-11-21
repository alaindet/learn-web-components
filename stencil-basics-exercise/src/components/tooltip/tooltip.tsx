import { Component, Prop, Method, h } from '@stencil/core';

@Component({
  tag: 'my-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class MyTooltipComponent {

  @Prop({ reflect: true, mutable: true }) isOpen: boolean;

  @Method()
  async open(): Promise<void> {
    this.isOpen = true;
  }

  @Method()
  async close(): Promise<void> {
    this.isOpen = false;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  render() {
    return [
      <span id="question">
        <span id="question-text">
          <slot name="question"></slot>
        </span>
        <span id="question-mark" onClick={this.toggle.bind(this)}>
          ?
        </span>
      </span>,
      <div id="answer" class={this.isOpen ? 'visible' : ''}>
        <slot name="answer"></slot>
      </div>
    ];
  }
}
