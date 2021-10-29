import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationUpdateRootProductArgs } from '@pickk/common';

export const useUpdateProduct = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateRootProduct'>,
    MutationUpdateRootProductArgs
  >(
    gql`
      mutation updateRootProduct($id: Int!, $input: UpdateProductInput!) {
        updateRootProduct(id: $id, input: $input) {
          id
          stock
        }
      }
    `
  );

  const updateProduct = async (id: number, stock: number) => {
    await update({
      variables: {
        id,
        input: {
          stock,
        },
      },
    });
  };

  return { updateProduct };
};
