import {gql, useMutation} from '@apollo/client';

const UPDATE_ITEM = gql`
  mutation UpdateItem($itemId: Int!, $isInfiniteStock: Boolean!) {
    updateItem(
      itemId: $itemId
      updateItemInput: {isInfiniteStock: $isInfiniteStock}
    ) {
      id
      isInfiniteStock
    }
  }
`;

export const useToggleIsInfiniteStock = () => {
  const [updateItem] = useMutation<
    unknown,
    {itemId: number; isInfiniteStock: boolean}
  >(UPDATE_ITEM);

  const toggleIsInfiniteStock = async (
    itemId: number,
    isInfiniteStock: boolean,
  ) => {
    await updateItem({
      variables: {
        itemId,
        isInfiniteStock,
      },
    });
  };

  return {toggleIsInfiniteStock};
};
