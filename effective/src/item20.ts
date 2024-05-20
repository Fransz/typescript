/*
 * Item 20: Understand How a Variable Gets Its Type
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-jsdoc */

// If you initialize a variable with a value, typescript has to infer a type, a set of possible values, from a single
// type. This is called widening, and can lead to errors.

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * returns a component of the vector.
 * @param { Vector3 } v - the vector
 * @param { 'x' | 'y' | 'z' } axis - the axis
 * @returns {number} - the component
 */
function getComponent(v: Vector3, axis: 'x' | 'y' | 'z'): number {
  return v[axis];
}

/* eslint-disable-next-line prefer-const */
let xaxis = 'x'; // Using let widens to string; TS assumes u intent to reassign it.
const v3 = { x: 0, y: 1, z: 2 };
// @ts-expect-error - Typescript widens the let statement, and gives a type error.
getComponent(v3, xaxis);

// How should TS infer this?
// ('1' | 1)[]; ['1', 1]; [string, number]; readonly [string, number]; (string| number)[]; ....
const mixed = ['1', 1];

/**
 * U can control the proces off widening in four ways:
 * - Use a const instead of a let; consts are inferred as precise as possible.
 * - Use a explicit type annotation;
 * - Use a as const assertion;
 * - Use the satisfies keyword.
 */

// ad 1; This gives no type error.
const yaxis = 'y';
getComponent(v3, yaxis);

// Using objects we cannot declare members as const;
const obj1 = {
  x: 1,
};

// @ts-expect-error - This gives an error, maybe unintendend
obj1.x = '2';

// ad 2; declaring obj2 controls the widening.
const obj2: { x: number | string } = {
  x: 1,
};
obj2.x = '1';

// ad 3. Using an as const assertion prevents the widening.
const obj3 = {
  x: 1 as const,
};
// @ts-expect-error - Now even this is an error.
obj3.x = 2;

// These solutions for widening don't help us with making sure a type is inferred as a tuple.
const t1 = [1, '1']; // Type of t1 = (string | number)[]

// ad 4. To enforce more specific type inference you can use the satisfies keyword.
type Point = [number, number];
const capitals = {
  amsterdam: [52.37403, 4.88969],
  berlin: [52.3112, 13.2417],
}; // type of capitals: { amsterdam: number[], berlin: number[]}

const capitals2 = {
  amsterdam: [52.37403, 4.88969],
  berlin: [52.3112, 13.2417],
} satisfies Record<string, Point>; // type of capitals2: { amsterdam: [number,number], berlin: [number,number]}

// Using capitals2: Record<string, Point> gives Record>string, point> as type.
// satifies isnt well documented.

// A more used solution is declaring a 'macro'
function tuple<T extends unknown[]>(...elements: T) {
  return elements;
}
const mixed2 = tuple(...[1, '1']);
const capitals3 = {
  amsterdam: tuple(...[52.37403, 4.88969]),
  berlin: tuple(...[52.3112, 13.2417]),
}; // type of capitals3: { amsterdam: [number,number], berlin: [number,number]}
