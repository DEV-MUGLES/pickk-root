import { gql, useQuery } from '@apollo/client';
import { ItemsExhibition } from '@pickk/common';

const GET_ITEMS_EXHIBITION = gql`
  query itemsExhibition($id: Int!) {
    itemsExhibition(id: $id) {
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

export const useItemsExhibition = (id: number) => {
  const { data } = useQuery<{ itemsExhibition: ItemsExhibition }>(
    GET_ITEMS_EXHIBITION,
    {
      variables: { id },
    }
  );

  return {
    data: data?.itemsExhibition,
  };
};
