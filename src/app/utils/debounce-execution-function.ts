const debounceState = new Map<any, number>();

export function debounced(context: any, time: number, callback: () => void): void;
export function debounced(context: any, callback: () => void): void;
export function debounced(context: any, arg2: (() => void) | number, arg3?: () => void) {
  const time = typeof arg2 === 'number' ? arg2 : undefined;
  const callback = typeof arg2 === 'function' ? arg2 : arg3 as () => void;

  let interval = debounceState.get(context);
  clearTimeout(interval);

  interval = setTimeout(() => {
    callback.bind(context)();
    debounceState.delete(context);
  }, time);

  debounceState.set(context, interval);
}
