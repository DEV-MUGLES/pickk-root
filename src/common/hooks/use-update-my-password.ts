import {gql, useMutation} from '@apollo/client';

const UPDATE_MY_PASSWORD = gql`
  mutation updateMyPassword($oldPassword: String!, $newPassword: String!) {
    updateMyPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`;

export const useUpdateMyPassword = () => {
  const [update] = useMutation<
    unknown,
    {oldPassword: string; newPassword: string}
  >(UPDATE_MY_PASSWORD);

  const updateMyPassword = async (oldPassword: string, newPassword: string) => {
    await update({
      variables: {oldPassword, newPassword},
    });
  };

  return {updateMyPassword};
};
