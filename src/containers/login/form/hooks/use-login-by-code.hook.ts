import { gql } from '@apollo/client';
import { JwtToken, LoginByCodeInput, useImperativeQuery } from '@pickk/common';

const LOGIN_BY_CODE = gql`
  query loginByCode($code: String!, $password: String!) {
    loginByCode(
      loginByCodeInput: { code: $code, password: $password, minRole: Admin }
    ) {
      access
      refresh
    }
  }
`;

export const useLoginByCode = () => {
  const { callQuery: loginByCode } = useImperativeQuery<
    { loginByCode: JwtToken },
    Pick<LoginByCodeInput, 'code' | 'password'>
  >(LOGIN_BY_CODE);

  const login = async (
    input: Pick<LoginByCodeInput, 'code' | 'password'>
  ): Promise<JwtToken> => {
    const {
      data: { loginByCode: jwtToken },
    } = await loginByCode(input);

    return jwtToken;
  };

  return { login };
};
