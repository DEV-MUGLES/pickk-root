import { gql, useMutation } from '@apollo/client';
import { Item } from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation updateRootItem($itemId: Int!, $isInfiniteStock: Boolean!) {
    updateRootItem(
      itemId: $itemId
      updateItemInput: { isInfiniteStock: $isInfiniteStock }
    ) {
      id
      isInfiniteStock
    }
  }
`;

export const useToggleIsInfiniteStock = () => {
  const [updateRootItem] = useMutation<
    { updateRootItem: Item },
    { itemId: number; isInfiniteStock: boolean }
  >(UPDATE_ITEM);

  const toggleIsInfiniteStock = async (
    itemId: number,
    isInfiniteStock: boolean
  ) => {
    await updateRootItem({
      variables: {
        itemId,
        isInfiniteStock,
      },
    });
  };

  return { toggleIsInfiniteStock };
};
