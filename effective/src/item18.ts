/*
 * Item 18, Type inference and control flow analysis
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Calculate the squres of a number array;
 * A return type is redundant; tsc infers it.
 * @param { number[] } ns - The numbers to square
 * @returns { number[] } - The squares
 */
function square(ns: number[]) {
  return ns.map((n) => n * n);
}

const sqs = square([1, 2, 3, 4]); // tsc infers the type correctly , even without a return type.

// Type inference is usually more precise then explicit annotations.
const s: string = 'x'; // Type os s is string;
const s_ = 'y'; // Type of s_ is 'y'; That is more precise. Note using a let here gives an inferred type of string.

// A general rule is: 'use types on function signatures; not on local variables'
// But leave the types of the signature of if they can be inferred.

/**
 * i.e. when using defaults; let tsc infer the type of n;
 * @param { string } s - some string
 * @param { number } n - some number
 * @returns { undefined }
 */
function f(s: string, n = 10) {
  console.log(`string: ${s}, number: ${n}`);
  return undefined;
}

// Type annotations are usefull when:
// - Your type is specified in another file;
// - You want to assign literals; Annotations check for excess properties;
// - When you use multiple return statements.
// - When you want to have named types.
// - When you want your types to help you design your software.

type Vector2 = {
  x: number;
  y: number;
};

/**
 * Add 2 vectors.
 * The type annotation is usefull here; Without it the return type would be {x: number, y: number}
 * @param { Vector2 } v1 - some vector
 * @param { Vector2 } v2 - another vector
 * @returns { Vector2 } - The vectors sum.
 */
function add(v1: Vector2, v2: Vector2): Vector2 {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}
