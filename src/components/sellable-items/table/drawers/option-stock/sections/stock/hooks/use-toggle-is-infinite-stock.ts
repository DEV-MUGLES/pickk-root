import { gql, useMutation } from '@apollo/client';
import { Item } from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation updateRootItem($id: Int!, $isInfiniteStock: Boolean!) {
    updateRootItem(id: $id, input: { isInfiniteStock: $isInfiniteStock }) {
      id
      isInfiniteStock
    }
  }
`;

export const useToggleIsInfiniteStock = () => {
  const [updateRootItem] = useMutation<
    { updateRootItem: Item },
    { id: number; isInfiniteStock: boolean }
  >(UPDATE_ITEM);

  const toggleIsInfiniteStock = async (
    id: number,
    isInfiniteStock: boolean
  ) => {
    await updateRootItem({
      variables: {
        id,
        isInfiniteStock,
      },
    });
  };

  return { toggleIsInfiniteStock };
};
