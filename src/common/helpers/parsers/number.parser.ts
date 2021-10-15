export const addLeadingZeros = (num: number, length: number) => {
  const result = num.toString();
  if (result.length >= length) {
    return result;
  }
  return new Array(length - result.length).fill('0').toString() + result;
};

export const addCommaToNumber = (num: number) => {
  if (num === undefined || num === null) return '';
  if (num === 0) return '0';
  const numString = num.toString();
  let result = '';
  let i = 0;
  for (; i < numString.length - 1; i++) {
    result += numString[i];
    if ((numString.length - i - 1) % 3 === 0) {
      result += ',';
    }
  }
  result += numString[i];
  if (result === '0') {
    return null;
  }
  return result;
};

export const removeDashFromNumber = (value: string) => {
  if (!value) {
    return undefined;
  }

  // 숫자로 시작하고, 숫자와 '-' 로만 구상된 경우
  const isNumberAndDashOnly =
    value.match(/^[0-9][0-9-]+/g)?.[0]?.length === value.length;
  return isNumberAndDashOnly ? value.split('-').join('') : value;
};
