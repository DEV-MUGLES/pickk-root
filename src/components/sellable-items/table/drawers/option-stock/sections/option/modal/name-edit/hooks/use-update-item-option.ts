import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationUpdateRootItemOptionArgs } from '@pickk/common';

const UPDATE_ITEM_OPTION = gql`
  mutation updateRootItemOption($id: Int!, $input: UpdateItemOptionInput!) {
    updateRootItemOption(id: $id, input: $input) {
      id
      name
      values {
        id
        name
      }
    }
  }
`;

export const useUpdateItemOption = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateRootItemOption'>,
    MutationUpdateRootItemOptionArgs
  >(UPDATE_ITEM_OPTION);

  const updateItemOption = async (id: number, name: string) => {
    await update({
      variables: {
        id,
        input: {
          name,
        },
      },
    });
  };

  return { updateItemOption };
};
