import { gql, useMutation } from '@apollo/client';
import { Mutation } from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation updateRootItem($id: Int!, $isInfiniteStock: Boolean!) {
    updateRootItem(id: $id, input: { isInfiniteStock: $isInfiniteStock }) {
      id
      isInfiniteStock
    }
  }
`;

export const useToggleIsInfiniteStock = () => {
  const [updateItem] = useMutation<
    Pick<Mutation, 'updateRootItem'>,
    { id: number; isInfiniteStock: boolean }
  >(UPDATE_ITEM);

  const toggleIsInfiniteStock = async (
    id: number,
    isInfiniteStock: boolean
  ) => {
    await updateItem({
      variables: {
        id,
        isInfiniteStock,
      },
    });
  };

  return { toggleIsInfiniteStock };
};
