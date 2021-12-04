export function getElementClassName(element: Element | undefined | null): string[] | null {
  if (!element) return null;

  let result;
  if (element.classList) {
    result = [];
    for (let i = 0; i < element.classList.length; i++) {
      result[i] = element.classList[i];
    }
  } else {
    result = element.className.trim().split(/\s+/);
  }
  return result;
}
