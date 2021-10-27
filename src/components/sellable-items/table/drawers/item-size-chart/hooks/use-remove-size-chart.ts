import { gql, useMutation } from '@apollo/client';
import { Item, MutationRemoveRootSizeChartArgs } from '@pickk/common';

const REMOVE_SIZE_CHART = gql`
  mutation removeRootSizeChart($itemId: Int!) {
    removeRootSizeChart(itemId: $itemId) {
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

export const useRemoveSizeChart = () => {
  const [_removeSizeChart] = useMutation<
    {
      item: Pick<Item, 'id' | 'sizeChart'>;
    },
    MutationRemoveRootSizeChartArgs
  >(REMOVE_SIZE_CHART);

  const removeSizeChart = async (itemId: number) => {
    await _removeSizeChart({
      variables: {
        itemId,
      },
    });
  };

  return { removeSizeChart };
};
