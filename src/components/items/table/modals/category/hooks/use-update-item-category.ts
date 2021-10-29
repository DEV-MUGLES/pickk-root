import { gql, useMutation } from '@apollo/client';
import { Item, ItemCategory } from '@pickk/common';

const UPDATE_ITEM_CATEGORY = gql`
  mutation UpdateItemCategory(
    $id: Int!
    $majorCategoryId: Float
    $minorCategoryId: Float
  ) {
    updateRootItem(
      id: $id
      input: {
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
  id: number;
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
    id: number,
    majorCategoryId: number,
    minorCategoryId: number
  ) => {
    await update({
      variables: {
        id,
        majorCategoryId,
        minorCategoryId,
      },
    });
  };

  return { updateItemCategory };
};
