/**
 * item 11; Distinguish Excess Property Checking from Type Checking
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

interface Room {
  height: number;
  nrDoors: number;
}

// @ts-expect-error
const r: Room = { height: 3.5, nrDoors: 2, elephant: true };

// Ok.
const obj = { height: 3.5, nrDoors: 2, elephant: true };
const rr: Room = obj;

interface Options {
  title: string;
  darkMode?: boolean;
}
/**
 * Dummy function.
 * @param {Options} options - The options.
 */
function createWindow(options: Options) {
  if (options.darkMode) {
    console.log('Setting darkmode');
  }
}

// Typescript saves us here, note the typo.
// @ts-expect-error
createWindow({ title: 'window', darkmode: true });

// But here it doesnt
const o1: Options = document;
const o2: Options = new HTMLAnchorElement();

// No excess property checks on type assertions
const o3 = { title: 'window', darkmode: true } as Options;

// A weak type.
interface Weak {
  prop1?: boolean;
  prop2?: string;
}

// Access property checks. Both error.
// @ts-expect-error
const w1: Weak = { prop3: 4 };
// @ts-expect-error
const w2: Weak = { prop1: true, prop3: 4 };

// Weaktype checks. Only one errors.
const o4 = { prop3: 4 };
const o5 = { prop1: true, prop3: 4 };
// @ts-expect-error
const w3: Weak = o4;
const w4: Weak = o5;
