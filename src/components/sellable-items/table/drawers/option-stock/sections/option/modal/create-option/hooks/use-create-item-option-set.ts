import { gql, useMutation } from '@apollo/client';
import {
  CreateItemOptionInput,
  CreateItemOptionSetInput,
  Item,
} from '@pickk/common';

export const CREATE_ITEM_OPTION_SET = gql`
  mutation createRootItemOptionSet(
    $id: Int!
    $input: CreateItemOptionSetInput!
  ) {
    createRootItemOptionSet(id: $id, createItemOptionSetInput: $input) {
      id
      options {
        id
        name
        values {
          id
          name
          priceVariant
        }
      }
      products {
        id
        isShipReserving
        itemOptionValues {
          id
          name
          priceVariant
        }
        stock
        stockThreshold
        createdAt
        updatedAt
      }
    }
  }
`;

export const useCreateItemOptionSet = () => {
  const [create] = useMutation<
    { createRootItemOptionSet: Item },
    { id: number; input: CreateItemOptionSetInput }
  >(CREATE_ITEM_OPTION_SET);

  const createItemOptionSet = async (
    id: number,
    options: CreateItemOptionInput[]
  ) => {
    await create({
      variables: {
        id,
        input: { options },
      },
    });
  };

  return { createItemOptionSet };
};
