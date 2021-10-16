import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationRemoveItemPriceArgs } from '@pickk/common';

export const useRemoveItemPrice = () => {
  const [remove] = useMutation<
    Pick<Mutation, 'removeItemPrice'>,
    MutationRemoveItemPriceArgs
  >(gql`
    mutation RemoveItemPrice($itemId: Int!, $priceId: Int!) {
      removeItemPrice(itemId: $itemId, priceId: $priceId) {
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
