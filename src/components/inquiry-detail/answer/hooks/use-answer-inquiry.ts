import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationAnswerRootInquiryArgs } from '@pickk/common';

const ANSWER_INQUIRY = gql`
  mutation answerRootInquiry(
    $id: Int!
    $answerInquiryInput: AnswerInquiryInput!
  ) {
    answerRootInquiry(id: $id, answerInquiryInput: $answerInquiryInput) {
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

export const useAnswerInquiry = () => {
  const [answer] = useMutation<
    Pick<Mutation, 'answerRootInquiry'>,
    MutationAnswerRootInquiryArgs
  >(ANSWER_INQUIRY);

  const answerInquiry = async (
    id: number,
    content: string,
    displayAuthor: string
  ) => {
    await answer({
      variables: {
        id,
        answerInquiryInput: {
          content,
          displayAuthor,
        },
      },
    });
  };

  return { answerInquiry };
};
