/**
 * item 7; Think of types as sets of values.
 *
 * KeyOf(A & B) = KeyOf(A) | KeyOf(B)
 * KeyOf(A | B) = KeyOf(A) & KeyOf(B)
 *
 * Interface Computer { memSize: number }
 * Interface Car { nrWheels: number }
 * Computer & Car is not the empty set;
 * Its the set with values { memSize: number, nrWheels: number }
 *
 * Computer | Car is a valid type; but the set of keys is empty typescript cannot help u with it.
 *
 * Type never is the empty set;
 * Type unknown is the universal set;
 * A literal type is a single element set;
 *
 * extends ~= is assignable to ~= subtype ~= subsets
 *
 * Interface Vector1 {x: number}
 * Interface Vector2 {x: number, y: number}
 * Interface Vector3 {x: number, y: number, z: number}
 *
 * Vector3 is a subtype of Vector2 is a subtype of Vector1
 *
 * +------------+
 * |  Vector1   |
 * |            |
 * |+----------+|
 * || Vector2  ||
 * ||          ||
 * ||+--------+||
 * |||Vector3 |||
 * |||        |||
 * ||+--------+||
 * ||          ||
 * |+----------+|
 * |            |
 * +------------+
 *
 */
interface Car {
  nrWheels: number;
}
interface Computer {
  memSize: number;
}

let a: Car | Computer = { nrWheels: 2 };
let b: Car & Computer = { nrWheels: 3, memSize: 4 };
type Ka = keyof (Car | Computer);
type Kb = keyof (Car & Computer);

let o = { test: 4 };
// @ts-expect-error
a = o;
// @ts-expect-error
b = o;
