import { gql, useMutation } from '@apollo/client';
import { Product, UpdateProductInput } from '@pickk/common';

export const useUpdateProduct = () => {
  const [update] = useMutation<
    { updateRootProduct: Product },
    { id: number; input: UpdateProductInput }
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
        input: { stock },
      },
    });
  };

  return { updateProduct };
};
