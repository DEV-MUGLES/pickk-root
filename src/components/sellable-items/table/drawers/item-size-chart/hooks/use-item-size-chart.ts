import { gql, useQuery } from '@apollo/client';
import { Item } from '@pickk/common';

const GET_ITEM_SIZE_CHART = gql`
  query item($id: Int!) {
    item(id: $id) {
      id
      sizeChart {
        id
        labels
        sizes {
          name
          values
        }
        recommendations {
          weight
          height
          sizeName
        }
      }
    }
  }
`;

export const useItemSizeChart = (itemId: number) => {
  const { data } = useQuery<
    {
      item: Pick<Item, 'id' | 'sizeChart'>;
    },
    { id: Number }
  >(GET_ITEM_SIZE_CHART, { variables: { id: itemId } });

  return { data: data?.item?.sizeChart };
};
