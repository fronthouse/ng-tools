import { tick as aTick } from '@angular/core/testing';
// import { mockDateClass } from './mock-date-class';

const DEFAULT = undefined;

// current Date of timestamp
let nowDate: number | undefined = DEFAULT;

/**
 * move date by offset `ms`
 * @param ms
 */
export function tick(ms?: number) {
  nowDate = (nowDate === undefined ? +new Date() : nowDate) + (ms || 0);
  aTick(ms);
}

/**
 * reset Date
 * if no parameter, then set to 0
 * @param ms
 * @returns {*}
 */
export const advanceTo = (ms: number) => (nowDate = ms ? +new Date(ms) : 0);

/**
 * clear mock
 * @returns {undefined}
 */
export const clearDate = () => (nowDate = DEFAULT);

export const setDate = (newDate: Date) => (nowDate = newDate.getTime());

/**
 * current
 * @returns {number}
 */
export const now = () => nowDate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockDateClass = (D: any) => {
  // if undefined, use real date, or else mock date
  const mockNow = () => (now() === undefined ? D.now() : now());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function Date(...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateArgs = args.length === 0 ? [mockNow()] : args;
    const instance = new D(...dateArgs);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  Date.prototype = Object.create(D.prototype);
  Object.setPrototypeOf(Date, D);

  // undefined means do not mock date
  Date.now = () => mockNow();
  // original Date class
  Date.__OriginalDate__ = D;
  // current() is for test.
  Date.current = () => D.now();
  Date.isMock = true;
  return Date;
};
