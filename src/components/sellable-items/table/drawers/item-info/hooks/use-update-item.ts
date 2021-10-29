import { gql, useMutation } from '@apollo/client';
import { Item, UpdateItemInput } from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation updateRootItem($itemId: Int!, $input: UpdateItemInput!) {
    updateRootItem(itemId: $itemId, updateItemInput: $input) {
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
    Item,
    { itemId: number; input: UpdateItemInput }
  >(UPDATE_ITEM);

  const updateItem = async (itemId: number, input: UpdateItemInput) => {
    await update({
      variables: { itemId, input },
    });
  };

  return { updateItem };
};
