import { gql, useMutation } from '@apollo/client';
import { Item, ItemCategory } from '@pickk/common';

const UPDATE_ITEM_CATEGORY = gql`
  mutation UpdateItemCategory(
    $itemId: Int!
    $majorCategoryId: Float
    $minorCategoryId: Float
  ) {
    updateRootItem(
      itemId: $itemId
      updateItemInput: {
        majorCategoryId: $majorCategoryId
        minorCategoryId: $minorCategoryId
      }
    ) {
      id
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

type UpdateItemCategoryArgsType = {
  itemId: number;
  majorCategoryId: number;
  minorCategoryId: number;
};

type UpdateItemCategoryReturnType = Pick<
  Item,
  'id' | 'majorCategoryId' | 'minorCategoryId'
> & {
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
};

export const useUpdateItemCategory = () => {
  const [update] = useMutation<
    { updateRootItem: UpdateItemCategoryReturnType },
    UpdateItemCategoryArgsType
  >(UPDATE_ITEM_CATEGORY);

  const updateItemCategory = async (
    itemId: number,
    majorCategoryId: number,
    minorCategoryId: number
  ) => {
    await update({
      variables: {
        itemId,
        majorCategoryId,
        minorCategoryId,
      },
    });
  };

  return { updateItemCategory };
};
