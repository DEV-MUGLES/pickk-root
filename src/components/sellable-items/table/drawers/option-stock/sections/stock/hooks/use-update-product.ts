import { gql, useMutation } from '@apollo/client';
import { MutationUpdateProductArgs, Product } from '@pickk/common';

export const useUpdateProduct = () => {
  const [update] = useMutation<
    { updateRootProduct: Product },
    MutationUpdateProductArgs
  >(
    gql`
      mutation updateRootProduct(
        $id: Int!
        $updateProductInput: UpdateProductInput!
      ) {
        updateRootProduct(id: $id, updateProductInput: $updateProductInput) {
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
        updateProductInput: {
          stock,
        },
      },
    });
  };

  return { updateProduct };
};
