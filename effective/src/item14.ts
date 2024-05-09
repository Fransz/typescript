/**
 * Item 14: Use readonly to Avoid Errors Associated with Mutation
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

interface PartlyImmutable {
  a: number;
  readonly b: number;
}

const a: PartlyImmutable = { a: 1, b: 2 };
a.a = 4;
// @ts-expect-error
a.b = 2;

interface Mutable {
  a: number;
  b: number;
  c: number[];
}

type FullyImmutable = Readonly<Mutable>;

const b: FullyImmutable = { a: 1, b: 2, c: [3] };
// @ts-expect-error
b.a = 2;

/*
 * Readonly<T> Caveats
 */
b.c[1] = 4; // Readonly<T> is shallow

const d: Readonly<Date> = new Date();
d.setFullYear(2025); // This still mutates; Readonly doesnt affect methods.

/*
 * Readonly aliases
 */
const aa: Array<Mutable> = [];
const bb: Mutable[] = [];
const cc: Readonly<Array<Mutable>> = [];
const dd: readonly Mutable[] = [];

/*
 * Example.
 */

/**
 * print triangle nummbers 0, 1, 3, 6, 10, 15
 * This prints the wrong sequence.
 * @param { number } n - upper limit
 */
function printTriangles(n: number) {
  console.log('Incorrect implementation.');
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(i);
    console.log(arraySum(nums));
  }
}

/**
 * Calculate the sum of an array of numbers.
 * This function is buggy it empties the array.
 * @param {number[]} arr = The array
 * @returns {number} - The sum
 */
function arraySum(arr: number[]): number {
  let sum = 0;
  let num;
  while ((num = arr.pop()) !== undefined) sum += num;
  return sum;
}

/**
 * Using a readonly array.
 * Note we cannot declare the array as readonly here (we use push), but an assertion will do.
 * Note this is the way to handle readonly arrays in libs u  dont control.
 * @param { number } n - upper limit
 */
function printTriangles2(n: number) {
  console.log('Correct implementation.');
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(i);
    console.log(arraySum2(nums as readonly number[]));
  }
}

/**
 * Calculate the sum of an array of numbers using a readonly array.
 * @param {number[]} arr = The array
 * @returns {number} - The sum
 */
function arraySum2(arr: readonly number[]): number {
  return arr.reduce((a, e) => a + e, 0);
}
printTriangles(5);
printTriangles2(5);
