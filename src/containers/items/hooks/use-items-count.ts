import { gql, useQuery } from '@apollo/client';
import { ItemFilter } from '@pickk/common';

export const useItemsCount = ({ filter }: { filter: ItemFilter }) => {
  const { data } = useQuery<{ itemsCount: number }, { itemFilter: ItemFilter }>(
    gql`
      query itemsCount($itemFilter: ItemFilter) {
        itemsCount(itemFilter: $itemFilter)
      }
    `,
    {
      variables: {
        itemFilter: filter,
      },
    }
  );

  return data?.itemsCount;
};
