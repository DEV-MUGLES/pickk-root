import { gql, useQuery } from '@apollo/client';
import {
  InquirySearchFilter,
  QuerySearchRootInquiriesArgs,
  Inquiry,
  Item,
  User,
} from '@pickk/common';

import { BoardTableDataFetcher } from '@components/common/organisms/board-table';

const INQUIRY_FRAGMENT = gql`
  fragment inquiryFragment on Inquiry {
    id
    isAnswered
    title
    content
    type
    isSecret
    createdAt
    orderItemMerchantUid
    contactPhoneNumber
    item {
      id
      imageUrl
      name
    }
    user {
      id
      nickname
      phoneNumber
    }
  }
`;

const GET_ROOT_INQUIRIES = gql`
  query searchRootInquiries(
    $searchFilter: InquirySearchFilter
    $pageInput: PageInput
    $query: String
  ) {
    searchRootInquiries(
      searchFilter: $searchFilter
      pageInput: $pageInput
      query: $query
    ) {
      result {
        ...inquiryFragment
      }
      total
    }
  }
  ${INQUIRY_FRAGMENT}
`;

export type InquiryDataType = Pick<
  Inquiry,
  | 'id'
  | 'isAnswered'
  | 'title'
  | 'content'
  | 'type'
  | 'isSecret'
  | 'orderItemMerchantUid'
  | 'createdAt'
  | 'contactPhoneNumber'
> & {
  item: Pick<Item, 'id' | 'name' | 'imageUrl'>;
  user: Pick<User, 'id' | 'nickname'>;
};

export const useInquiries: BoardTableDataFetcher<
  InquiryDataType,
  InquirySearchFilter
> = ({ filter, pageInput, query }) => {
  const { data, loading, refetch } = useQuery<
    { searchRootInquiries: { result: InquiryDataType[]; total: number } },
    QuerySearchRootInquiriesArgs
  >(GET_ROOT_INQUIRIES, {
    variables: {
      searchFilter: filter,
      pageInput,
      query,
    },
  });

  return {
    data: data?.searchRootInquiries?.result,
    total: data?.searchRootInquiries?.total,
    loading,
    refetch,
  };
};
