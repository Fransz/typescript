/**
 * Item 16: Prefer More Precise Alternatives to Index Signatures
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Typescript let you specify flexible mappings, with index signatures.
 */
type Rocket = { [prop: string]: string };
const rocket: Rocket = {
  name: 'Falcon 9',
  variant: 'v1.0',
  thrust: '4,940 kN',
};

// There are downsides to this:
// - All keys should have the same type. Thrust cannot be a number.
// - It allows all keys; typos are not prevented;
// - {} is a valid Rocket
// - The ts language server doesn't help you with this.

/**
 * Parse a csv string
 * This mmight be a use case for index signatures but the same downsides apply.
 * U'd better use a Map here.
 * @param { string } input - The input
 * @returns { object } - The output
 */
function parseCSV(input: string): { [colname: string]: string }[] {
  const lines = input.split('\n');
  const [header, ...rows] = lines;
  const headers = header.split(',');
  return rows.map((r: string) => {
    const row: { [colname: string]: string } = {};
    r.split(',').forEach((cell, i) => {
      row[headers[i]] = cell;
    });
    return row;
  });
}

/**
 * Parse a csv string
 * We use a map here; To get an object we need to parse the map.
 * @param { string } input - The input
 * @returns {Map<string, string>[]} - The output
 */
function parseCSV_(input: string): Map<string, string>[] {
  const lines = input.split('\n');
  const [header, ...rows] = lines;
  const headers = header.split(',');
  return rows.map((r: string) => {
    const row = new Map<string, string>();
    r.split(',').forEach((cell, i) => {
      row.set(headers[i], cell);
    });
    return row;
  });
}

/**
 * Parse a map to a rocket.
 * Now we can be sure the value has the shape we expect;
 * We can flag data invalid while parsing instead of while consuming it.
 * @param { Map<string, string>} map - The input
 * @returns { object } - The rocket.
 */
function parseRocket(
  map: Map<string, string>,
): Pick<Rocket, 'name' | 'variant'> & { thrust: number } {
  const name = map.get('name');
  const variant = map.get('variant');
  const thrust = Number(map.get('thrust'));

  if (!name || !variant || !thrust) throw Error('Not a valid rocket!');
  return { name, variant, thrust };
}

/**
 * Utility type Record.
 * Sometimes u want to use a index signature type, but the type for the keys, strings, is to broad.
 * We can use a subset of strings for the keys with the Record Utility type.
 */
type Vector = Record<'x' | 'y' | 'z', number>;
const v4: Vector = { x: 1, y: 2, z: 3 };

/**
 * an index signature type can be used with known indices.
 * crucially is that the types of the known properties should be subtype of the type of the unknown properties
 */
type AnotherRocket = {
  thrust: number;
  [props: string]: unknown;
};
