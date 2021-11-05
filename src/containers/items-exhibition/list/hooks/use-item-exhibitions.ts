import { gql, useQuery } from '@apollo/client';
import { ItemsExhibition } from '@pickk/common';

const GET_ITEMS_EXHIBITIONS = gql`
  query itemsExhibitions {
    itemsExhibitions {
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
        name
        imageUrl

        originalPrice
        finalPrice

        isSoldout

        brand {
          id
          nameKor
        }
      }
    }
  }
`;

export const useItemsExhibitions = () => {
  const { data } = useQuery<{ itemsExhibitions: ItemsExhibition[] }>(
    GET_ITEMS_EXHIBITIONS
  );

  return {
    data: data?.itemsExhibitions,
  };
};
