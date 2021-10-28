import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateItemArgs, UpdateItemInput} from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation UpdateItem($itemId: Int!, $updateItemInput: UpdateItemInput!) {
    updateItem(itemId: $itemId, updateItemInput: $updateItemInput) {
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
    Pick<Mutation, 'updateItem'>,
    MutationUpdateItemArgs
  >(UPDATE_ITEM);

  const updateItem = async (
    itemId: number,
    updateItemInput: UpdateItemInput,
  ) => {
    await update({
      variables: {
        itemId,
        updateItemInput,
      },
    });
  };

  return {updateItem};
};
