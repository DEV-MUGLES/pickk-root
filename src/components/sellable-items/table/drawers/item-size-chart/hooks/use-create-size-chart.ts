import { gql, useMutation } from '@apollo/client';
import {
  Item,
  MutationCreateRootSizeChartArgs,
  ItemSizeInput,
} from '@pickk/common';

const CREATE_SIZE_CHART = gql`
  mutation createRootSizeChart(
    $input: CreateItemSizeChartInput!
    $itemId: Int!
  ) {
    createRootSizeChart(input: $input, itemId: $itemId) {
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

export const useCreateSizeChart = () => {
  const [_createSizeChart] = useMutation<
    {
      item: Pick<Item, 'id' | 'sizeChart'>;
    },
    MutationCreateRootSizeChartArgs
  >(CREATE_SIZE_CHART);

  const createSizeChart = async (
    itemId: number,
    input: {
      labels: string[];
      sizes: ItemSizeInput[];
    }
  ) => {
    await _createSizeChart({
      variables: {
        input,
        itemId,
      },
    });
  };

  return { createSizeChart };
};
