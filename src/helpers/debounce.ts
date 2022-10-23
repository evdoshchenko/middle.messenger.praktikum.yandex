export function debounce(func: Function, time: number) {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => { func(); }, time);
  };
}
