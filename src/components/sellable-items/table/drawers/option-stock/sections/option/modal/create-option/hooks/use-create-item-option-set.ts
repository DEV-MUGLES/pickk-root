import { gql, useMutation } from '@apollo/client';
import {
  MutationCreateItemOptionSetArgs,
  CreateItemOptionInput,
  Item,
} from '@pickk/common';

export const CREATE_ITEM_OPTION_SET = gql`
  mutation createRootItemOptionSet(
    $id: Int!
    $createItemOptionSetInput: CreateItemOptionSetInput!
  ) {
    createRootItemOptionSet(
      id: $id
      createItemOptionSetInput: $createItemOptionSetInput
    ) {
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
    MutationCreateItemOptionSetArgs
  >(CREATE_ITEM_OPTION_SET);

  const createItemOptionSet = async (
    id: number,
    options: CreateItemOptionInput[]
  ) => {
    await create({
      variables: {
        id,
        createItemOptionSetInput: {
          options,
        },
      },
    });
  };

  return { createItemOptionSet };
};
