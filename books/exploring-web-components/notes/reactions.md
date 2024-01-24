# Custom Element Reactions

- *Custom Element Reactions* are just methods that get called during the lifecycle of a Web Component

## Methods

- `connectedCallback()`: called when the element is added to the document. Any setup should happen here
- `disconnectedCallback()`: called when the element is removed from the document.
- `adoptedCallback()`: called when the element is moved to a new document
- `attributeChangedCallback()`: called when attributes change (added, removed, replaced)

## Resources
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
