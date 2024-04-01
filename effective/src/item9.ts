/**
 * item 9; Prefer Type Annotations to Type Assertions
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

interface Person {
  name: string;
}

const alice: Person = { name: 'Alice' };
const bob = { name: 'Bob' } as Person;

// Met assertions is dit mogelijk, met annotations niet.
const charlie: Person = {};
const denise = {} as Person; // Geen fout, maar die wil je meestal wel.

// Een extra property geeft ook een foutmelding (in een literal), dat wil je meestal.
// Maar eigenlijk is dit wel geldig.Extra properties zijn toegestaan. Zie excess properties (item 11)
const eve: Person = { name: 'Eve', birthDay: '1963/03/20' };
const fred = { name: 'Fred', birthDay: '1963/03/20' } as Person;

// Een oudere manier van type assertions
const gerald = <Person>{ name: 'Gerald' };

// Type annotations in een arrow functie zijn wat lastig.
let people = ['Mia', 'Regi', 'Kelsey', 'Maire'].map((name) => ({ name })); // {name: string}[]

people = ['Mia', 'Regi', 'Kelsey', 'Maire'].map((name) => ({ name }) as Person); // Person[]
people = ['Mia', 'Regi', 'Kelsey', 'Maire'].map(() => ({}) as Person); // Person[] maar dat klopt eigenlijk niet.

people = ['Mia', 'Regi', 'Kelsey', 'Maire'].map((name): Person => ({ name })); // Person[]; De annotatie buiten de parameter list
const family: Person[] = ['Mia', 'Regi', 'Kelsey', 'Maire'].map(
  (name): Person => ({ name }),
);
// Let in de regels hierboven op het gebruik van parenthesis om het object.

// Type assertions gebruik je alleen als je zeker weet dat jij het beter weet dan de type inferer
document.querySelector('#myButton')?.addEventListener('click', (e) => {
  const button = e.currentTarget as HTMLButtonElement; // e.currentTarget: EventTarget | null
});

// The not null assertion.
let el = document.querySelector('#myButton') as HTMLButtonElement;
el = document.querySelector('#myButton')!;

// Maar de optional chaining operator is preferable. Dat is runtime.
document.querySelector('#myButton')?.addEventListener('click', (e) => e);

// Assertion naar non-overlapping types.
const body = document.body; // HTMLElement
const p: Person = body as Person;
const pp: Person = body as unknown as Person;
