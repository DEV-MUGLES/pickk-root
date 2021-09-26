import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationRootAnswerInquiryArgs } from '@pickk/common';

const ANSWER_INQUIRY = gql`
  mutation rootAnswerInquiry(
    $id: Int!
    $answerInquiryInput: AnswerInquiryInput!
  ) {
    rootAnswerInquiry(id: $id, answerInquiryInput: $answerInquiryInput) {
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
    Pick<Mutation, 'rootAnswerInquiry'>,
    MutationRootAnswerInquiryArgs
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
