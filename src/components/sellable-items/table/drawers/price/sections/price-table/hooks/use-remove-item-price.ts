import { gql, useMutation } from '@apollo/client';
import { Item, MutationRemoveItemPriceArgs } from '@pickk/common';

export const useRemoveItemPrice = () => {
  const [remove] = useMutation<
    { removeRootItemPrice: Item },
    MutationRemoveItemPriceArgs
  >(gql`
    mutation removeRootItemPrice($itemId: Int!, $priceId: Int!) {
      removeRootItemPrice(itemId: $itemId, priceId: $priceId) {
        id
        prices {
          id
        }
      }
    }
  `);

  const removeItemPrice = async (itemId: number, priceId: number) => {
    await remove({
      variables: {
        itemId,
        priceId,
      },
    });
  };

  return { removeItemPrice };
};
