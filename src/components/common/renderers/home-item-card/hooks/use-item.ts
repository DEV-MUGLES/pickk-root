import { gql, useQuery } from '@apollo/client';
import { Item } from '@pickk/common';

const GET_ITEM = gql`
  query item($id: Int!) {
    item(id: $id) {
      name
      imageUrl

      originalPrice
      finalPrice

      brand {
        nameKor
      }
    }
  }
`;

export const useItem = (id: number) => {
  const { data } = useQuery<{ item: Item }>(GET_ITEM, {
    variables: { id },
  });

  return {
    data: data?.item,
  };
};
