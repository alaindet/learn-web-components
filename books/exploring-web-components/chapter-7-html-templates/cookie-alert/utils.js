export function setCookie(cookieName, cookieValue, expiresInDays) {

  const date = addDays(new Date(), expiresInDays);
  const expiration = date.toUTCString();

  document.cookie = [
    `${cookieName}=${cookieValue}`,
    `expires=${expiration}`,
    `path=/`,
  ].join(';');
}

export function getCookie(cookieName) {

  const decodedCookie = decodeURIComponent(document.cookie);
  const fields = decodedCookie.split(';');

  for (const field of fields) {
    const [name, value] = field.trim().split('=');
    if (cookieName === name) {
      return value;
    }
  }

  return '';
}

export function addDays(date, days) {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const timeIntervalInMilliseconds = days * millisecondsInDay;
  date.setTime(date.getTime() + timeIntervalInMilliseconds);
  return date;
}
