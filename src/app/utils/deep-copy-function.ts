import { cloneDeep } from 'lodash-es';

export function deepCopy<T = any>(obj: T): T {
  return cloneDeep(obj);
}
