import {InquiryType} from '@pickk/common';

const {Etc, Restock, Ship, Size} = InquiryType;

export const getInquiryTypeDisplayName = (type: InquiryType): string => {
  if (!type) {
    return '';
  }

  return {
    [Etc]: '기타',
    [Restock]: '재입고',
    [Ship]: '배송',
    [Size]: '사이즈',
  }[type];
};
