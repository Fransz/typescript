/**
 * Item 15: Use Type Operations and Generic Types to Avoid Repeating Yourself
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * In code we know the DRY principle, this applies to types also.
 */

type Options = object;
interface Response {}

/**
 * Dummy function
 * @param {string} url Some url
 * @param {Options} options Some Options
 */
// @ts-expect-error this should return something
function get(url: string, options: Options): Promise<Response> {
  console.log(url, options);
}

/**
 * Dummy function
 * @param {string} url Some url
 * @param {Options} options Some Options
 */
// @ts-expect-error this should return something
function post(url: string, options: Options): Promise<Response> {
  console.log(url, options);
}

// following item 13 this is better written as:
type httpFn = (url: string, options: object) => Promise<Response>;
// @ts-expect-error This should return something
const get_q: httpFn = (url, options) => {
  console.log(url, options);
};
// @ts-expect-error This should return something
const post_q: httpFn = (url, options) => {
  console.log(url, options);
};

/**
 * U can factor out common members.
 */
interface Bird {
  wingSpanCm: number;
  weightGram: number;
  isNocturnal: boolean;
  color: string;
}
interface Mammal {
  weightGram: number;
  isNocturnal: boolean;
  color: string;
  eatsPlants: boolean;
}
interface Vertebrate {
  weightGram: number;
  isNocturnal: boolean;
  color: string;
}

interface Bird_q extends Vertebrate {
  wingSpanCm: number;
}
interface Mammal_q extends Vertebrate {
  wingSpanCm: number;
}

/**
 * Typescript Utilty types -- Mapped Types;
 */

/**
 * Pick
 */
interface State {
  userId: number;
  pageTitle: number;
  recentFiles: string[];
  pageContents: string;
}
interface NavState {
  userId: State['userId'];
  pageTitle: State['pageTitle'];
  recentFiles: State['recentFiles'];
}

//however this is still repetive; We'd better use a mapped type.
type NavState_q = { [K in 'userId' | 'pageTitle' | 'recentFiles']: State[K] };

// Or with a utility type from the stdlib. See item 50 for why this isnt valid typescript.
// type MyPick<T, K extends string | number | symbol> = { [k in K]: T[k] };
type NavState_qq = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;

// An example of picking one key from an union of multiple SomeTypes.
interface LoadAction {
  type: 'load';
  action: () => void;
}
interface SaveAction {
  type: 'save';
  action: (text: string) => void;
}

type Action = LoadAction | SaveAction;
// Action type is updated as you define more Actions; Usefull for tagged unions.
type ActionType = Action['type'];

/**
 * Partial
 */
// To be used in an constructor
interface WidgetOptions {
  width: number;
  height: number;
}

// To be used in an update function
interface WidgetOptionsUpdate {
  width?: number;
  height?: number;
}

interface WWidgetOptions {
  width: number;
  height: number;
}

type WWidgetOptionsUpdate = Partial<WWidgetOptions>;

type MyPartial = {
  [k in keyof WWidgetOptions]?: WWidgetOptions[k] | undefined;
};

// Mapped types can use the as clause; U can use it to reverse the key and the (literal) type of the key.
// We'll use it in type programming
interface SortToLong {
  q: 'search';
  n: 'numberOfResults';
}

type LongToShort = {
  [k in keyof SortToLong as SortToLong[k]]: k;
};

// If you use keyof in your mapped types, the resulting types ar homomorphic;
// preserving readonly and optional.

/**
 * typeof operator.
 * JS has a typeof operator, it reurns the JS type of an expression, as a string.
 * It can return 'string', 'number', 'boolean', 'object', 'undefined', 'bigint', 'symbol' or 'function'
 *
 * TS has a typeof operator, return the TS type of an expression, as a Type.
 *
 * The typeof plays a role in type space as well in value space.
 */
const api = {
  name: 'frans',
  age: 61,
};
type Api = typeof api;

// This makes sense if the JS object is the single value of truth;
// This makes sense if you want to create a named type for an inferred type. i.e. from a function value.

/**
 * Some function.
 * @param { unknown } param - some parameter
 * @returns { object } - The return value
 */
function test(param: unknown) {
  /* .... */
  return {
    color: 'red',
    length: 12,
    well: param,
  };
}
type TheType = ReturnType<typeof test>;

// Typescript also provides Parameters or constructorParameters, for using values a the single source of truth.
// Note that Parameters or ConstructorParameters return a tupple.
