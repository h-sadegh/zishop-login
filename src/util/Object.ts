export function Delete(object: any, fieldName: string) {
  try {
    delete object?.[fieldName];
  } catch (e) {
    // console.log("e12", e);
  }
}

export function Compare(x: any, y: any) {
  if (isNaN(x) && isNaN(y) && typeof x === "number" && typeof y === "number") {
    return true;
  }
  if (typeof x !== typeof y) {
    return false;
  }
  if (x === y) {
    return true;
  }
  if ((y && !x) || (!y && x)) {
    return false;
  }
  if (
    (typeof x === "function" && typeof y === "function") ||
    (x instanceof Date && y instanceof Date) ||
    (x instanceof RegExp && y instanceof RegExp) ||
    (x instanceof String && y instanceof String) ||
    (x instanceof Number && y instanceof Number)
  ) {
    return x.toString() === y.toString();
  }

  // At last checking prototypes as good as we can
  if (!(x instanceof Object && y instanceof Object)) {
    return false;
  }

  if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
    return false;
  }

  if (x.constructor !== y.constructor) {
    return false;
  }

  if (x.prototype !== y.prototype) {
    return false;
  }

  // Quick checking of one object being a subset of another.
  // todo: cache the structure of arguments[0] for performance
  for (let p in y) {
    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
      return false;
    } else if (typeof y[p] !== typeof x[p]) {
      return false;
    }
  }

  for (let p in x) {
    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
      return false;
    } else if (typeof y[p] !== typeof x[p]) {
      return false;
    }

    if (x[p] !== y[p]) {
      return false;
    }
  }

  return true;
}
