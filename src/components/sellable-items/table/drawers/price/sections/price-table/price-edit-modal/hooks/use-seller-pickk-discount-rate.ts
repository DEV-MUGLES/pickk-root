import { gql, useQuery } from '@apollo/client';
import { Seller, SellerSaleStrategy } from '@pickk/common';

const GET_SELLER_PICKK_DISCOUNT_RATE = gql`
  query seller($id: Int!) {
    seller(id: $id) {
      id
      saleStrategy {
        id
        pickkDiscountRate
      }
    }
  }
`;

export const useSellerPickkDiscountRate = (sellerId: number) => {
  const { data } = useQuery<
    {
      seller: Pick<Seller, 'id'> & {
        saleStrategy: Pick<SellerSaleStrategy, 'id' | 'pickkDiscountRate'>;
      };
    },
    { id: number }
  >(GET_SELLER_PICKK_DISCOUNT_RATE, {
    variables: {
      id: sellerId,
    },
  });

  return { data: data?.seller?.saleStrategy?.pickkDiscountRate };
};
