import { gql, useMutation } from '@apollo/client';
import { ItemsExhibition, UpdateItemsExhibitionInput } from '@pickk/common';

const UPDATE_ROOT_ITEMS_EXHIBITION = gql`
  mutation updateRootItemsExhibition(
    $id: Int!
    $input: UpdateItemsExhibitionInput!
  ) {
    updateRootItemsExhibition(id: $id, input: $input) {
      id
      title
      description

      imageUrl
      imageTop
      imageRight
      backgroundColor

      order
      isVisible

      items {
        id
      }
    }
  }
`;

export const useUpdateItemsExhibition = () => {
  const [updateRootItemsExhibition] = useMutation<
    { updateRootItemsExhibition: ItemsExhibition },
    { id: number; input: UpdateItemsExhibitionInput }
  >(UPDATE_ROOT_ITEMS_EXHIBITION);

  const update = async (id: number, input: UpdateItemsExhibitionInput) => {
    await updateRootItemsExhibition({ variables: { id, input } });
  };

  return update;
};
