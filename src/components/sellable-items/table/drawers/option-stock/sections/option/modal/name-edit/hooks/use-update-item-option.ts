import { gql, useMutation } from '@apollo/client';
import { ItemOption, MutationUpdateItemOptionArgs } from '@pickk/common';

const UPDATE_ROOT_ITEM_OPTION = gql`
  mutation updateRootItemOption(
    $id: Int!
    $updateItemOptionInput: UpdateItemOptionInput!
  ) {
    updateRootItemOption(
      id: $id
      updateItemOptionInput: $updateItemOptionInput
    ) {
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
    MutationUpdateItemOptionArgs
  >(UPDATE_ROOT_ITEM_OPTION);

  const updateRootItemOption = async (id: number, name: string) => {
    await update({
      variables: {
        id,
        updateItemOptionInput: {
          name,
        },
      },
    });
  };

  return { updateRootItemOption };
};
