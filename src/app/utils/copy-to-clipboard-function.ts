export function copyToClipboard(text: string) {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.style.width = '1px';
  selBox.value = text;
  document.body.appendChild(selBox);
  const currentFocus = document.activeElement as any;
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  if (currentFocus && currentFocus.focus) {
    currentFocus.focus();
  }
}
