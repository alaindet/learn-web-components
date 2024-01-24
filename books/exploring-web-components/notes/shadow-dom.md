# Shadow DOM

- The Shadow DOM is a technology enabling **encapsulation** for Custom Elements in the browser
- This is achieved by calling `HTMLElement.attachShadow()` on any regular HTML element
- The `attachShadow()` allows you to create a shadow DOM in **open** or **closed** mode (see further) and returns a reference to the newly created shadow Root

## Nomenclature
- **Shadow Host** is the element hosting the shadow DOM, acts as a wrapper
- **Shadow Tree** is the encapsulated tree of element nodes, separated from the parent DOM it is attached to
- **Shadow Root** is the root element *inside* the shadom DOM, while the shadow Host is *outisde* the shadow DOM

## Open and closed mode

### Open mode
- An **open** shadow DOM is created via `HTMLElement.attachShadow({ mode: 'open' })` and allows any JS code to access it via the `shadowRoot` property of the shadow host
- The open shadow DOM still encapsulates styles, DOM events and nodes, but it remains accessible

### Closed mode
- A **closed** shadow DOM is created via `HTMLElement.attachShadow({ mode: 'closed' })`, it returns the shadow Root instance and it explicitly sets the `shadowRoot` property to `null` in order to avoid explicitly querying elements inside it
- Also, the nodes inside a closed shadow DOM are not visible from the Browser's Elements panel and are not easily accessible
- The closed mode enforces strong encapsulation
