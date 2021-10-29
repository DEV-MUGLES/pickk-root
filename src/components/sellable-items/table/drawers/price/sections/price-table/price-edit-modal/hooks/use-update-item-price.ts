import { gql, useMutation } from '@apollo/client';
import { Item, UpdateItemPriceInput } from '@pickk/common';

const UPDATE_ITEM_PRICE = gql`
  mutation updateRootItemPrice($id: Int!, $input: UpdateItemPriceInput!) {
    updateRootItemPrice(id: $id, input: $input) {
      id
      originalPrice
      sellPrice
      finalPrice
      prices {
        id
        startAt
        endAt
        originalPrice
        sellPrice
        isActive
      }
    }
  }
`;

export const useUpdateItemPrice = () => {
  const [update] = useMutation<
    { updateRootItemPrice: Item },
    { id: number; input: UpdateItemPriceInput }
  >(UPDATE_ITEM_PRICE);

  const updateItemPrice = async (id: number, input: UpdateItemPriceInput) => {
    await update({
      variables: { id, input },
    });
  };

  return { updateItemPrice };
};
