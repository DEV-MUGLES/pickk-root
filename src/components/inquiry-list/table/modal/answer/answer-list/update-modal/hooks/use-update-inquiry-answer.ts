import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationUpdateRootInquiryAnswerArgs } from '@pickk/common';

const UPDATE_ROOT_INQUIRY_ANSWER = gql`
  mutation updateRootInquiryAnswer(
    $id: Int!
    $updateInquiryAnswerInput: UpdateInquiryAnswerInput!
  ) {
    updateRootInquiryAnswer(
      id: $id
      updateInquiryAnswerInput: $updateInquiryAnswerInput
    ) {
      id
      content
      displayAuthor
      createdAt
    }
  }
`;

export const useUpdateInquiryAnswer = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateRootInquiryAnswer'>,
    MutationUpdateRootInquiryAnswerArgs
  >(UPDATE_ROOT_INQUIRY_ANSWER);

  const updateInquiryAnswer = async (
    id: number,
    content: string,
    displayAuthor: string
  ) => {
    await update({
      variables: {
        id,
        updateInquiryAnswerInput: {
          content,
          displayAuthor,
        },
      },
    });
  };

  return { updateInquiryAnswer };
};
