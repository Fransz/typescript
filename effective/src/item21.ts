/*
 * item 21. Create objects all at once.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * As we learned in item 19; A variables value can change easaliy, it's type changes only when TS uses type narrowing.
 * From this, and from the way TS infers types (item 20) follows: try to create objects all at once.
 */

const pt = {};
/* @ts-expect-error - this gives an error; pts inferred type is {]} */
pt.x = 12;

type Point = [number, number];
/* @ts-expect-error - this gives an error; points inferred type is Point} */
const point: Point = {};

// The best solution is to define an object in one step.
const pt_ = {
  x: 12,
  y: 13,
};

// If u want to build an object from mutiple other objects you should use spread syntax;
// Using Object.assign() gives types errors.
const p = { x: 3, y: 4 };
const id = { name: 'Pythagoras' };
const namedPoint = {};
Object.assign(namedPoint, p, id);
// @ts-expect-error - this gives an error; namedpoints type is inferred as {};
namedPoint.name;

const anotherNamedPoint = { ...p, ...id };
console.log(anotherNamedPoint.name);

// This also works with optional properties
declare let hasDates: boolean;
const nameAndTitle = { name: 'Khufu', title: 'Pharao' };
// pharaoh has conditional properties
const pharaoh = {
  ...nameAndTitle,
  ...(hasDates ? { start: -2598, end: -2547 } : null),
};
