import { gql, useQuery } from '@apollo/client';
import { InquiryAnswer } from '@pickk/common';

const GET_INQUIRY_ANSWERS = gql`
  query rootInquiry($id: Int!) {
    rootInquiry(id: $id) {
      id
      answers {
        id
        content
        displayAuthor
        createdAt
      }
    }
  }
`;

export type InquiryAnswerDataType = Pick<
  InquiryAnswer,
  'id' | 'content' | 'displayAuthor' | 'createdAt'
>;

export const useInquiryAnswers = (id: number) => {
  const { data, refetch } = useQuery<
    {
      rootInquiry: {
        id: number;
        answers: InquiryAnswerDataType[];
      };
    },
    { id: number }
  >(GET_INQUIRY_ANSWERS, {
    variables: {
      id,
    },
  });

  return { data: data?.rootInquiry.answers, refetch };
};
