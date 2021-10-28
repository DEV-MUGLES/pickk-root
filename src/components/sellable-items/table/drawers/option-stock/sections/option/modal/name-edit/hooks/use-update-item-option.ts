import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateItemOptionArgs} from '@pickk/common';

const UPDATE_ITEM_OPTION = gql`
  mutation updateItemOption(
    $id: Int!
    $updateItemOptionInput: UpdateItemOptionInput!
  ) {
    updateItemOption(id: $id, updateItemOptionInput: $updateItemOptionInput) {
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
    Pick<Mutation, 'updateItemOption'>,
    MutationUpdateItemOptionArgs
  >(UPDATE_ITEM_OPTION);

  const updateItemOption = async (id: number, name: string) => {
    await update({
      variables: {
        id,
        updateItemOptionInput: {
          name,
        },
      },
    });
  };

  return {updateItemOption};
};
