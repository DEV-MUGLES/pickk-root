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
