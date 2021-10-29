import { gql, useMutation } from '@apollo/client';
import {
  Mutation,
  MutationUpdateRootItemArgs,
  UpdateItemInput,
} from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation updateRootItem($id: Int!, $input: UpdateItemInput!) {
    updateRootItem(id: $id, input: $input) {
      id
      name
      imageUrl
      majorCategoryId
      minorCategoryId
      majorCategory {
        id
        name
      }
      minorCategory {
        id
        name
      }
    }
  }
`;

export const useUpdateItem = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateRootItem'>,
    MutationUpdateRootItemArgs
  >(UPDATE_ITEM);

  const updateItem = async (id: number, input: UpdateItemInput) => {
    await update({
      variables: {
        id,
        input,
      },
    });
  };

  return { updateItem };
};
