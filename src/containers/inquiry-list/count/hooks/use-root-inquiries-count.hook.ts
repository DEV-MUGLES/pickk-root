import { gql, useQuery } from '@apollo/client';
import { InquiriesCountOutput } from '@pickk/common';

const GET_ROOT_INQUIRIES_COUNT = gql`
  query rootInquiriesCount {
    rootInquiriesCount {
      not_answered
      delayed
      lastUpdatedAt
    }
  }
`;

export const useRootInquiriesCount = (): InquiriesCountOutput => {
  const { data } = useQuery<{ rootInquiriesCount: InquiriesCountOutput }>(
    GET_ROOT_INQUIRIES_COUNT
  );

  return data?.rootInquiriesCount;
};
