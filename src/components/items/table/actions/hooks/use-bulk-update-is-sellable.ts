import { gql, useMutation } from '@apollo/client';
import { Mutation } from '@pickk/common';

const BULK_UPDATE_IS_SELLABLE = gql`
  mutation BulkUpdateRootItems($ids: [Int!]!, $isSellable: Boolean) {
    bulkUpdateRootItems(
      ids: $ids
      bulkUpdateItemInput: { isSellable: $isSellable }
    )
  }
`;

export const useBulkUpdateIsSellable = () => {
  const [bulkUpdate] = useMutation<
    boolean,
    { ids: number[]; isSellable: boolean }
  >(BULK_UPDATE_IS_SELLABLE);

  const bulkUpdateIsSellable = async (ids: number[], isSellable: boolean) => {
    await bulkUpdate({
      variables: {
        ids,
        isSellable,
      },
    });
  };

  return { bulkUpdateIsSellable };
};
