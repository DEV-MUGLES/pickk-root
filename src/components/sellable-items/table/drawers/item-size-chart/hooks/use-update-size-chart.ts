import { gql, useMutation } from '@apollo/client';
import {
  Item,
  MutationUpdateRootSizeChartArgs,
  UpdateItemSizeChartInput,
} from '@pickk/common';

const UPDATE_SIZE_CHART = gql`
  mutation updateRootSizeChart(
    $input: UpdateItemSizeChartInput!
    $itemId: Int!
  ) {
    updateRootSizeChart(input: $input, itemId: $itemId) {
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

export const useUpdateSizeChart = () => {
  const [_updateSizeChart] = useMutation<
    {
      item: Pick<Item, 'id' | 'sizeChart'>;
    },
    MutationUpdateRootSizeChartArgs
  >(UPDATE_SIZE_CHART);

  const updateSizeChart = async (
    itemId: number,
    input: UpdateItemSizeChartInput
  ) => {
    await _updateSizeChart({
      variables: {
        input,
        itemId,
      },
    });
  };

  return { updateSizeChart };
};
