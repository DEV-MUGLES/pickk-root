import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

export const useItemCategoryTree = () => {
  const {data} = useQuery<Pick<Query, 'itemCategoryTree'>>(gql`
    query itemCategoryTree {
      itemCategoryTree {
        id
        name
        children {
          id
          name
        }
      }
    }
  `);

  return {data: data?.itemCategoryTree};
};
