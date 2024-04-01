/**
 * item 8; Know How to Tell Whether a Symbol Is in the Type Space or Value Space
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

interface Cylinder {
  radius: number;
  height: number;
}

const Cylinder = (radius: number, height: number) => ({ radius, height });

/**
 * calcVolume
 * @param { unknown } shape - The shape
 */
function calcVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    // @ts-expect-error instanceof is Value Space; Cylinder is the function.
    shape.radius;
  }
}

// It is not easy to tell from the symbol Whether it is in Type or Valuse space.
type T1 = 'string literal';
const v1 = 'string literal';
type T2 = 123;
const v2 = 123;

/**
 * Cylinder2
 * Some TS constructs introduce a symbol in Type space as well as a symbol in Value space.
 * Cylinder2's type: { radius: number, height: number }
 * Cylinder2's value: The constructor
 * @param { number } radius - The radius
 * @param { number } height - The height
 */
class Cylinder2 {
  radius: number;
  height: number;
  constructor(radius: number, height: number) {
    this.radius = radius;
    this.height = height;
  }
}

/**
 * calcVolume2
 * @param {unknown} shape - the shape
 */
function calcVolume2(shape: unknown) {
  if (shape instanceof Cylinder2) shape.radius; // Cylinder2 is in Value space.
}
