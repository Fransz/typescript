/**
 * Item 13: Know the Differences Between type and interface
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

type AorB = 'a' | 'b';

// An union can appear inside an attribute
type Input = { foo: string };
type Output = { bar: string };
interface VarMap {
  [name: string]: Input | Output;
}

// Dit kan niet met een interface
type NamedVar = (Input | Output) & { name: string };

// Functie types zijn 'natuurijker' als Type
type Fn = (s: string) => number;
interface someI {
  (s: string): number;
}

// Een interface kan geen type extenden dat niet ook als interface geschreven zou kunnen zijn.
interface myInput extends Input {
  extra: number;
}

// @ts-expect-error
interface AorBorC extends AorB {
  c: 'c';
}

type AorBorD = 'a' | 'b' | 'd';

// Met types kan je meer, unions, mapped types, conditional types.
// Interfaces geven betere foutmeldingen.
interface Person {
  name: string;
  age: string;
}

type TPerson = Person & { age: number }; // Geen foutmelding
// @ts-expect-error
interface Iperson extends Person {
  // Foutmelding
  age: number;
}

// Interfaces zijn uit te breiden. Dat gebeurd steeds met de meegeleverde types. in .d.ts files
interface Person {
  gender: string;
}
