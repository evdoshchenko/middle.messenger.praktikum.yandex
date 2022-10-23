export function queryStringify(data: { [s: string]: unknown; } | ArrayLike<unknown>) {
  let strResult = '?';
  const items = Object.entries(data);

  for (let i = 0; i < items.length; i += 1) {
    strResult += (strResult !== '?') ? '&' : '';
    strResult += Array.isArray(items[i]) ? `${i}=${items[i].toString()}` : `${i}=${items[i]}`;
  }

  return strResult;
}
