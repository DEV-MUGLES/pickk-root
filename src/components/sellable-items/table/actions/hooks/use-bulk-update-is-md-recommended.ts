import {gql, useMutation} from '@apollo/client';
import {Mutation} from '@pickk/common';

const BULK_UPDATE_IS_MD_RECOMMENDED = gql`
  mutation BulkUpdateItems($ids: [Int!]!, $isMdRecommended: Boolean) {
    bulkUpdateItems(
      ids: $ids
      bulkUpdateItemInput: {isMdRecommended: $isMdRecommended}
    )
  }
`;

export const useBulkUpdateIsMdRecommended = () => {
  const [bulkUpdate] = useMutation<
    Pick<Mutation, 'bulkUpdateItems'>,
    {ids: number[]; isMdRecommended: boolean}
  >(BULK_UPDATE_IS_MD_RECOMMENDED);

  const bulkUpdateIsMdRecommended = async (
    ids: number[],
    isMdRecommended: boolean,
  ) => {
    await bulkUpdate({
      variables: {
        ids,
        isMdRecommended,
      },
    });
  };

  return {bulkUpdateIsMdRecommended};
};
