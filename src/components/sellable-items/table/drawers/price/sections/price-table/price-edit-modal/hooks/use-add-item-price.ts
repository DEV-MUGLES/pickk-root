import { gql, useMutation } from '@apollo/client';
import {
  AddItemPriceInput,
  Item,
  MutationAddRootItemPriceArgs,
} from '@pickk/common';

const ADD_ITEM_PRICE = gql`
  mutation addRootItemPrice($id: Int!, $input: AddItemPriceInput!) {
    addRootItemPrice(id: $id, input: $input) {
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

export const useAddItemPrice = () => {
  const [add] = useMutation<
    { addRootItemPrice: Item },
    MutationAddRootItemPriceArgs
  >(ADD_ITEM_PRICE);

  const addItemPrice = async (id: number, input: AddItemPriceInput) => {
    await add({
      variables: {
        id,
        input,
      },
    });
  };

  return { addItemPrice };
};
