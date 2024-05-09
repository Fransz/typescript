/**
 * item 10; Avoid Object Wrapper Types (String, Number, Boolean, Symbol, BigInt)
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable-next-line @typescript-eslint/unbound-method */
const org = String.prototype.charAt;

/**
 * Show the boxing mechanism in action.
 * The primitive value is boxed, the method is called, and the primitive value is unboxed.
 * @param {number} i - The character index
 * @returns { string } - The character at the specified index.
 */
String.prototype.charAt = function (i: number): string {
  const msg = `This is how it works: this: ${this as string}, typeof this: ${typeof this}, i: ${i}`;
  console.log(msg);
  return org.call(this, i);
};

'test'.charAt(1);

let s1: string = 'test'; // eslint-disable-line prefer-const
let s2: String = new String('test'); // eslint-disable-line @typescript-eslint/ban-types

// @ts-expect-error
s1 = new String('tost');
s2 = 'tost';
