import { gql, useQuery } from '@apollo/client';
import { Inquiry, Item, User, OrderItem } from '@pickk/common';

const GET_INQUIRY = gql`
  query rootInquiry($id: Int!) {
    rootInquiry(id: $id) {
      id
      sellerId
      type
      isAnswered
      isSecret
      title
      content
      createdAt
      item {
        id
        imageUrl
        name
      }
      user {
        id
        nickname
        oauthProvider
        oauthCode
      }
      orderItemMerchantUid
      orderItem {
        id
        merchantUid
        productVariantName
        quantity
        order {
          buyer {
            id
            name
            phoneNumber
          }
        }
      }
    }
  }
`;

type InquiryDetailDataType = Pick<
  Inquiry,
  | 'id'
  | 'sellerId'
  | 'type'
  | 'isAnswered'
  | 'isSecret'
  | 'title'
  | 'content'
  | 'createdAt'
  | 'orderItemMerchantUid'
> & {
  item: Pick<Item, 'id' | 'imageUrl' | 'name'>;
  user: Pick<User, 'id' | 'nickname' | 'oauthProvider' | 'oauthCode'>;
  orderItem: Pick<
    OrderItem,
    'id' | 'merchantUid' | 'productVariantName' | 'quantity'
  > & {
    order: {
      buyer: Pick<User, 'id' | 'name' | 'phoneNumber'>;
    };
  };
};

export const useInquiry = (id: number) => {
  const { data, loading } = useQuery<
    { rootInquiry: InquiryDetailDataType },
    { id: number }
  >(GET_INQUIRY, {
    variables: {
      id,
    },
  });

  return { data: data?.rootInquiry, loading };
};
