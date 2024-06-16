/*
 * Item 19: Use Different Variables for Different Types
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

// In Js you can do this.
type fetchById = (id: string) => Promise<string>;
type fetchBySerialNumber = (id: number) => Promise<string>;
let productId = '12-05-22-80';

// @ts-expect-error - ts prevents the assignement.
productId = 12052280;

// @ts-expect-error - in js we can do this.
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
fetchById(productId);

// @ts-expect-error - in js we can do this.
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
fetchBySerialNumber(productId);

// If u really want to reuse productId declare it an union.
let id: string | number = '12-05-22-80';
id = 12052022;

// Way better is introducing 2 variables with each a simple type.
// The union is hard to reason about;
// You can use const for each variable instead of a single let.

/**
 * In typescript a variables value can change; 
 * Its type usually doesn't except in type narrowing.
 */
