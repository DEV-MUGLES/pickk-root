export const addDashToPhoneNumber = (value: string | number): string => {
  if (!value) {
    return '';
  }

  const number = value.toString().replace(/[^0-9]/g, '');

  const secondIndex = number.length > 10 ? 7 : 6;
  const result = [
    number.slice(0, 3),
    number.slice(3, secondIndex),
    number.slice(secondIndex, number.length),
  ]
    .filter((value) => value != '')
    .join('-');
  return result;
};

// 필터에서 전화번호를 검색할 때 '-'를 없애기 위해 존재
export const removeDashFromNumber = (value: string) => {
  if (!value) {
    return undefined;
  }

  // 숫자로 시작하고, 숫자와 '-' 로만 구상된 경우
  const isNumberAndDashOnly =
    value.match(/^[0-9][0-9-]+/g)?.[0]?.length === value.length;
  return isNumberAndDashOnly ? value.split('-').join('') : value;
};
