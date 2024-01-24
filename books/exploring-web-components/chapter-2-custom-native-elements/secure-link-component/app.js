init(); // <-- Start here

function init() {
  const secureLink = document.createElement(
    'a',
    { is: 'app-secure-link' },
  );

  secureLink.href = 'http://www.example.com';
  secureLink.innerHTML = 'Example.com';

  document.body.append(secureLink);
}
