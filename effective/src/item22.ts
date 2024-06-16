/**
 * item 22; Understanding type narrowing.
 */

// A common example of type narrowing a.k.a control flow analyisis.
const elem = document.getElementById('the-time');

if (elem) {
  elem.innerHTML = 'Partye time'; // type HTMLElement
} else {
  elem; // type null
  console.log('not yet');
}
