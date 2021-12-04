export function isPromise<K = any>(obj: any): obj is Promise<K> {
  return typeof obj === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function' && typeof obj.finally === 'function';
}
