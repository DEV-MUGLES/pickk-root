import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateProductArgs} from '@pickk/common';

export const useUpdateProduct = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateProduct'>,
    MutationUpdateProductArgs
  >(
    gql`
      mutation UpdateProduct(
        $id: Int!
        $updateProductInput: UpdateProductInput!
      ) {
        updateProduct(id: $id, updateProductInput: $updateProductInput) {
          id
          stock
        }
      }
    `,
  );

  const updateProduct = async (id: number, stock: number) => {
    await update({
      variables: {
        id,
        updateProductInput: {
          stock,
        },
      },
    });
  };

  return {updateProduct};
};
