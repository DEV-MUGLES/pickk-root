export const stringSorter = (a: string, b: string) => {
  if (a && b) {
    return a.localeCompare(b);
  } else if (a) {
    return -1;
  } else if (b) {
    return 1;
  } else {
    return 0;
  }
};
