import {ItemPrice} from '@pickk/common';

export const getActivatedPrice = (prices: Array<ItemPrice>): ItemPrice => {
  // 활성화 된 가격이 없는 경우 연동된 가격을 기본값으로 사용
  return (
    prices.find(({isActive}) => isActive) || prices.find(({isBase}) => isBase)
  );
};
