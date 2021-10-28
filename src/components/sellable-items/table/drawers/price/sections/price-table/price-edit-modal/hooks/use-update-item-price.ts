import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationUpdateItemPriceArgs,
  UpdateItemPriceInput,
} from '@pickk/common';

const UPDATE_ITEM_PRICE = gql`
  mutation UpdateItemPrice(
    $id: Int!
    $updateItemPriceInput: UpdateItemPriceInput!
  ) {
    updateItemPrice(id: $id, updateItemPriceInput: $updateItemPriceInput) {
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
    Pick<Mutation, 'updateItemPrice'>,
    MutationUpdateItemPriceArgs
  >(UPDATE_ITEM_PRICE);

  const updateItemPrice = async (
    id: number,
    updateItemPriceInput: UpdateItemPriceInput,
  ) => {
    await update({
      variables: {
        id,
        updateItemPriceInput,
      },
    });
  };

  return {updateItemPrice};
};
