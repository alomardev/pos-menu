export function equalIgnoreCase(str1: string, str2: string) {
  return str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
}
