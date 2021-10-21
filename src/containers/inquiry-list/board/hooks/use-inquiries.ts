import { gql, useQuery } from '@apollo/client';
import {
  InquiryFilter,
  QueryRootInquiriesArgs,
  Inquiry,
  Item,
  User,
} from '@pickk/common';

import { BoardTableDataFetcher } from '@components/common/organisms/board-table';

const GET_ROOT_INQUIRIES = gql`
  query rootInquiries($filter: InquiryFilter, $pageInput: PageInput) {
    rootInquiries(filter: $filter, pageInput: $pageInput) {
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
        name
        nickname
        phoneNumber
      }
    }
  }
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

/** @TODO 데이터 총 개수를 알기 위한 임시 쿼리 훅 */
const useInquiriesCount = ({ filter }: { filter: InquiryFilter }): number => {
  const { data } = useQuery<
    { rootInquiries: InquiryDataType[] },
    QueryRootInquiriesArgs
  >(
    gql`
      query rootInquiries($filter: InquiryFilter) {
        rootInquiries(filter: $filter) {
          id
        }
      }
    `,
    { variables: { filter } }
  );

  return (data?.rootInquiries || []).length;
};

export const useInquiries: BoardTableDataFetcher<
  InquiryDataType,
  InquiryFilter
> = ({ filter, pageInput }) => {
  const { data, loading, refetch } = useQuery<
    { rootInquiries: InquiryDataType[] },
    QueryRootInquiriesArgs
  >(GET_ROOT_INQUIRIES, {
    variables: {
      filter,
      pageInput,
    },
  });
  const total = useInquiriesCount({ filter });

  return {
    data: data?.rootInquiries,
    total,
    loading,
    refetch,
  };
};
