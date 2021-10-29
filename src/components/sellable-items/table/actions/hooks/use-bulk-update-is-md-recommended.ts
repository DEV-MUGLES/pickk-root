import { gql, useMutation } from '@apollo/client';

const BULK_UPDATE_IS_MD_RECOMMENDED = gql`
  mutation BulkUpdateRootItems($ids: [Int!]!, $isMdRecommended: Boolean) {
    bulkUpdateRootItems(
      ids: $ids
      bulkUpdateItemInput: { isMdRecommended: $isMdRecommended }
    )
  }
`;

export const useBulkUpdateIsMdRecommended = () => {
  const [bulkUpdate] = useMutation<
    boolean,
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
