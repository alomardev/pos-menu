export function isRTL(doc: Document = document) {
  return doc?.documentElement.getAttribute('dir')?.toLowerCase() === 'rtl';
}

export function setDir(dir: 'rtl' | 'ltr' | null, doc: Document = document) {
  dir && doc ?
    doc.documentElement.setAttribute('dir', dir) :
    doc.documentElement.removeAttribute('dir');
}
