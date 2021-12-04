interface ElementState {
  hasStyleAttribute: boolean;
  overflowValue: string;
}

const elementsState = new Map<HTMLElement, ElementState>();

export function showScrollbars(target: HTMLElement) {
  const storedState = elementsState.get(target);
  if (storedState) {
    target.style.overflow = storedState.overflowValue;
    if (!storedState.hasStyleAttribute) {
      target.removeAttribute('style');
    }
  }
}

export function hideScrollbars(target: HTMLElement) {
  if (!elementsState.has(target)) {
    elementsState.set(target, {
      overflowValue: target.style.overflow,
      hasStyleAttribute: !!target.getAttribute('style'),
    })
  }
  target.style.overflow = 'hidden';
}
