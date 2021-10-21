import { gql, useQuery } from '@apollo/client';
import { Brand } from '@pickk/common';

const GET_BRANDS = gql`
  query brands {
    brands {
      id
      nameKor
    }
  }
`;

export const useBrands = () => {
  const { data } =
    useQuery<{ brands: Array<Pick<Brand, 'id' | 'nameKor'>> }>(GET_BRANDS);

  return { data: data?.brands };
};
