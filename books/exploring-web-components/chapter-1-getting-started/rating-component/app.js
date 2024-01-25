window.onload = () => {
  const theRating = document.querySelector('#the-rating');
  const theButton = document.querySelector('#the-button');

  // Update component programmatically
  theButton.addEventListener('click', () => {
    theRating.maxValue = getRandomInteger(5, 20);
    theRating.value = getRandomInteger(0, theRating.maxValue);
  });

  // Add DOM events to custom element
  theRating.addEventListener('click', event => {
    const { value, maxValue } = event.target;
    alert(`Rating: { value: ${value}, maxValue: ${maxValue} }`);
  });

  // Create component programmatically
  // document.body.append(
  //   createMyRatingComponent(6, 10),
  // );
};

// https://github.com/alaindet/js-park/blob/1487780f222c8f17f1211126fcaa9696c483bb8b/js/functions/random.js#L61
function getRandomInteger(from, to) {
  return from + Math.floor((Math.random() * (to - from + 1)));
}

function createMyRatingComponent(value, maxValue) {
  const c = document.createElement('my-rating');
  c.value = value;
  c.maxValue = maxValue;
  return c;
}
