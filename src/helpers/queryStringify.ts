export function queryStringify(data: { [s: string]: unknown; } | ArrayLike<unknown>) {
  let strResult = '?';
  const items = Object.entries(data);

  items.forEach((item, i) => {
    strResult += (strResult !== '?') ? '&' : '';
    strResult += Array.isArray(item) ? `${i}=${item.toString()}` : `${i}=${item}`;
  });

  return strResult;
}
