import { gql, useMutation } from '@apollo/client';
import { Mutation } from '@pickk/common';

const BULK_UPDATE_IS_MD_RECOMMENDED = gql`
  mutation bulkUpdateRootItems($ids: [Int!]!, $isMdRecommended: Boolean) {
    bulkUpdateRootItems(ids: $ids, input: { isMdRecommended: $isMdRecommended })
  }
`;

export const useBulkUpdateIsMdRecommended = () => {
  const [bulkUpdate] = useMutation<
    Pick<Mutation, 'bulkUpdateRootItems'>,
    { ids: number[]; isMdRecommended: boolean }
  >(BULK_UPDATE_IS_MD_RECOMMENDED);

  const bulkUpdateIsMdRecommended = async (
    ids: number[],
    isMdRecommended: boolean
  ) => {
    await bulkUpdate({
      variables: {
        ids,
        isMdRecommended,
      },
    });
  };

  return { bulkUpdateIsMdRecommended };
};
