# HTML Attributes
- Attributes are just data bound to the HTML representation of a DOM node
- They are readable and easy to target via CSS for styling, i. e. the selector `[type="submit"]` targets any element having the `type="submit"` attribute
- Different element have different sets of standard attributes, i. e. `<input>` has the `type` attribute, while `<p>` doesn't
- However `<p type="something">...</p>` is still valid and the `type` attribute is accessible even if it doesn't mean anything standard
- Attributes are **case insensitive**, i. e. `onClick` and `onclick` are equal (see examples)
- Attributes' values are **always strings**

## Public method vs attributes
- A custom element instance can publicly expose methods like any JavaScript instance
- In general, if you need to perform complex operations or pass any compound value to the custom element (i. e., objects, arrays), a setter public method is better than serializing the compound value to a string and pass it to an attribute
- Attributes' values are always strings and are best used for primitive values (strings, numbers, booleans)

## Examples

### Case insensitiveness

```html
<p id="question" answer="42">...</p>

<script>
  const question = document.querySelector('#question');
  console.log(question.getAttribute('answer')); // '42'
  console.log(question.getAttribute('ANSWER')); // '42'
  console.log(question.getAttribute('AnsWEr')); // '42'

  console.log(question.attributes.getNamedItem('answer').value); // '42'
  console.log(question.attributes.getNamedItem('ANSWER').value); // '42'
  console.log(question.attributes.getNamedItem('AnsWEr').value); // '42'
</script>
```

### Public methods
```html
<a is="speaking-link" id="the-link" href="https://www.example.com">Example.com</a>

<script>
  class SpeakingLinkElement extends HTMLAnchorElement {
    speak() { // <-- Here is a simple public method
      alert(this.getAttribute('href'));
    }
  }

  customElements.define('speaking-link', SpeakingLinkElement, { extends: 'a' });

  window.onload = () => {
    const link = document.getElementById('the-link');
    link.speak();
  };
</script>
```
