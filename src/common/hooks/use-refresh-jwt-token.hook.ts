import { useEffect } from 'react';
import axios from 'axios';
import { JwtToken } from '@pickk/common';

import { getCookie, setCookie } from '@common/helpers';

const REFRESH_JWT_TOKEN = `
  query refreshJwtToken {
    refreshJwtToken {
      access
      refresh
    }
  }
`;

export const useRefreshJwtToken = () => {
  useEffect(() => {
    axios
      .post<{ data: { refreshJwtToken: JwtToken } }>(
        process.env.NEXT_PUBLIC_API_URL + '/graphql',
        {
          query: REFRESH_JWT_TOKEN,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('refreshToken')}`,
          },
        }
      )
      .then(({ data }) => {
        const jwtToken = data.data.refreshJwtToken;

        setCookie('accessToken', jwtToken.access);
        setCookie('refreshToken', jwtToken.refresh);
      });
  }, []);
};
