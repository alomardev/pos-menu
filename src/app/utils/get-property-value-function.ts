import { property } from 'lodash-es';

export function getPropertyValue<T = any>(obj: any, path: string | string[]): T | undefined {
  const getter = property<any, T | undefined>(path);
  return getter(obj);
}
