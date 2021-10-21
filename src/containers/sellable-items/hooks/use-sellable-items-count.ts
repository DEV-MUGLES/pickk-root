import { gql, useQuery } from '@apollo/client';
import { Query, ItemFilter } from '@pickk/common';

export const useSellableItemsCount = ({ filter }: { filter: ItemFilter }) => {
  const { data } = useQuery<Pick<Query, 'items'>, { itemFilter: ItemFilter }>(
    gql`
      query items($itemFilter: ItemFilter) {
        items(itemFilter: $itemFilter) {
          id
        }
      }
    `,
    {
      variables: {
        itemFilter: filter,
      },
    }
  );

  return data?.items.length;
};
