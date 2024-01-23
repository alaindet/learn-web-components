# `connectedCallback()`
- It runs "usually once" and should contain setup code, DOM manipulation etc.
- It can run more than once on the same instance in rare cases
  - When the instance gets *upgraded* (see below)
  - When the instance is moved to another DOM node (but why?!)

## Upgrading vs creating
The happy path of using a web component is to define its class extending `HTMLElement`, let the browser know about it it via `window.customElements.define` and *then* use its *tag* to either **create** it in HTML directly or via the JavaScript DOM API.

However, if the browser sees an unknown tag (including via the DOM API), it creates an instance of `HTMLUnknownElement` with all the data related to the unknown tag and it correctly inserts it into the DOM even if it doesn't know what to do with it.

Then, when you later define the unknown tag via `window.customElements.define`, the browser **upgrades** the `HTMLUnknownElement` instance to the right custom element and `connectedCallback` is called.

From the custom element's instance perspective, `connectedCallback` is called just once, but the element instance already exists, it's just "upgrading" rather than being "created". It doesn't affect your code in any way, but it's worth knowing.

## `connectedCallback` multiple calls
- In order to strictly avoid executing `connectedCallback` multiple times, a simple boolean property can be used

```js
class MyCustomElement extends HTMLElement {

  #initialized = false;

  connectedCallback() {
    if (this.#initialized) {
      return;
    }

    // Initialization code goes here...
    this.#initialized = true;
  }
}
```
