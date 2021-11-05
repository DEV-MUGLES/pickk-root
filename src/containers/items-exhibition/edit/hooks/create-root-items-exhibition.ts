import { gql, useMutation } from '@apollo/client';
import { ItemsExhibition, CreateItemsExhibitionInput } from '@pickk/common';

const CREATE_ROOT_ITEMS_EXHIBITION = gql`
  mutation createRootItemsExhibition($input: CreateItemsExhibitionInput!) {
    createRootItemsExhibition(input: $input) {
      id
      title
      description

      imageUrl
      imageTop
      imageRight
      backgroundColor

      order
      isVisible
      videoId

      items {
        id
      }
    }
  }
`;

export const useCreateItemsExhibition = () => {
  const [createRootItemsExhibition] = useMutation<
    { createRootItemsExhibition: ItemsExhibition },
    { input: CreateItemsExhibitionInput }
  >(CREATE_ROOT_ITEMS_EXHIBITION);

  const create = async (input: CreateItemsExhibitionInput) => {
    await createRootItemsExhibition({ variables: { input } });
  };

  return create;
};
