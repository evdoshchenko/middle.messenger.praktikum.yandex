export function escape(str:string) {
  return String(str).replace(/[^\w. ]/gi, '');
}
