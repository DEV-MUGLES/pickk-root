import { gql, useMutation } from '@apollo/client';
import {
  Mutation,
  MutationCreateRootItemOptionSetArgs,
  CreateItemOptionInput,
} from '@pickk/common';

export const CREATE_ITEM_OPTION_SET = gql`
  mutation createRootItemOptionSet(
    $id: Int!
    $input: CreateItemOptionSetInput!
  ) {
    createRootItemOptionSet(id: $id, input: $input) {
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
    Pick<Mutation, 'createRootItemOptionSet'>,
    MutationCreateRootItemOptionSetArgs
  >(CREATE_ITEM_OPTION_SET);

  const createItemOptionSet = async (
    id: number,
    options: CreateItemOptionInput[]
  ) => {
    await create({
      variables: {
        id,
        input: {
          options,
        },
      },
    });
  };

  return { createItemOptionSet };
};
