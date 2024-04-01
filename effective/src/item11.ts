/**
 * item 10; Distinguish Excess Property Checking from Type Checking
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

interface Room {
  height: number;
  nrDoors: number;
}

// foutmmelding.
const r: Room = { height: 3.5, nrDoors: 2, elephant: true };

// Ok.
const obj = { height: 3.5, nrDoors: 2, elephant: true };
const rr = obj;

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

// Typescript saves us here.
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
const w1: Weak = { prop3: 4 };
const w2: Weak = { prop1: true, prop3: 4 };

// Weaktype checks. Only one errors.
const o3 = { prop3: 4 };
const o4 = { prop1: true, prop3: 4 };
const w3: Weak = o3;
const w4: Weak = o4;
