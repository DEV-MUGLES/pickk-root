import { gql, useQuery } from '@apollo/client';
import {
  InquiryFilter,
  QueryRootInquiriesArgs,
  Inquiry,
  Item,
  User,
} from '@pickk/common';

import { BoardTemplateProps } from '@components/common/template';

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

export const useInquiries: BoardTemplateProps['useBoardData'] = ({
  filter,
}: {
  filter?: InquiryFilter;
}) => {
  const { data, loading, refetch } = useQuery<
    { rootInquiries: InquiryDataType[] },
    QueryRootInquiriesArgs
  >(GET_ROOT_INQUIRIES, {
    variables: {
      filter,
    },
  });

  return { data: data?.rootInquiries, loading, refetch };
};
