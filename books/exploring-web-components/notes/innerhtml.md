# `Element.innerHTML` vs DOM API

- When creating HTML blocks declaratively (without frameworks), setting `Element.innerHTML` to a string has the advantage of being clearer than using the DOM API

## Pros
- Clear
- Concise
- Mimics what you see in `.html` files
- Allows to interpolate JS variables easily
- Does not create variables and references to the DOM API
- Parsing strings containing HTML as DOM nodes is what browsers are optimized for

## Cons
- Does not allow to attach event listeners or call any DOM API per se
- Entirely replaces the DOM children nodes, destroying any reference to existing nodes
- It is a little slower compared to `Element.appendChild()`
- It exposes to risks if you're using user-provided interpolated values
- It used to be (TODO: is it still?) non-standard
- If you're relying on many conditionals to build the string, use DOM API instead
- DOM API is much more granular and non-destructive when needed
