import { deepCopy } from "./deep-copy-function";

/**
 * Copy source properties to target object if the property not assigned in the target
 * @param source Default properties
 * @param target Object that holds the overall properties
 */
 export function mergeProperties<T>(source: T, target: T): T | null {
  // Copy as is if undefined
  if (target === undefined) {
    return deepCopy(source);
  }
  // Null should always be null
  if (target === null) {
    return null;
  }
  // No need to iterate through non-objects
  if (typeof target === 'object') {
    for (const key in source) {
      if (!(source as any).hasOwnProperty(key)) {
        continue;
      }
      if ((target as any).hasOwnProperty(key)) {
        target[key] = mergeProperties(source[key], target[key]) as any;
      } else {
        target[key] = deepCopy(source[key]);
      }
    }
  }
  return target;
}
