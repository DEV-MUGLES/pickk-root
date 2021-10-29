import { gql, useMutation } from '@apollo/client';
import { ItemOption, UpdateItemOptionInput } from '@pickk/common';

const UPDATE_ROOT_ITEM_OPTION = gql`
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
    { updateRootItemOption: ItemOption },
    { id: number; input: UpdateItemOptionInput }
  >(UPDATE_ROOT_ITEM_OPTION);

  const updateRootItemOption = async (id: number, name: string) => {
    await update({
      variables: {
        id,
        input: { name },
      },
    });
  };

  return { updateRootItemOption };
};
