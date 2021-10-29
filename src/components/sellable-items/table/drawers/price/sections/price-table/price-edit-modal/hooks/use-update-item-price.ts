import { gql, useMutation } from '@apollo/client';
import {
  Item,
  MutationUpdateItemPriceArgs,
  UpdateItemPriceInput,
} from '@pickk/common';

const UPDATE_ITEM_PRICE = gql`
  mutation updateRootItemPrice(
    $id: Int!
    $updateItemPriceInput: UpdateItemPriceInput!
  ) {
    updateRootItemPrice(id: $id, updateItemPriceInput: $updateItemPriceInput) {
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
    MutationUpdateItemPriceArgs
  >(UPDATE_ITEM_PRICE);

  const updateItemPrice = async (
    id: number,
    updateItemPriceInput: UpdateItemPriceInput
  ) => {
    await update({
      variables: {
        id,
        updateItemPriceInput,
      },
    });
  };

  return { updateItemPrice };
};
