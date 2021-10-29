import { gql, useMutation } from '@apollo/client';
import { Item, MutationUpdateItemArgs, UpdateItemInput } from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation updateRootItem($itemId: Int!, $updateItemInput: UpdateItemInput!) {
    updateRootItem(itemId: $itemId, updateItemInput: $updateItemInput) {
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
  const [update] = useMutation<Item, MutationUpdateItemArgs>(UPDATE_ITEM);

  const updateItem = async (
    itemId: number,
    updateItemInput: UpdateItemInput
  ) => {
    await update({
      variables: {
        itemId,
        updateItemInput,
      },
    });
  };

  return { updateItem };
};
