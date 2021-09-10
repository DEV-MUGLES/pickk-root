import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { IncomingMessage } from 'http';

import { getCookie } from '@common/helpers';

import { APOLLO_STATE_PROP_NAME } from './apollo.constants';

let apolloClient: ApolloClient<unknown>;

if (!process.env.API_URL) {
  throw new Error('env.API_URL not found!');
}

const authMiddleware = (req?: IncomingMessage) =>
  new ApolloLink((operation, forward) => {
    const token = getCookie('accessToken', req);
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });

    return forward(operation);
  });

export function createApolloClient(req?: IncomingMessage) {
  return new ApolloClient({
    uri: process.env.API_URL + '/graphql',
    ssrMode: typeof window === 'undefined',
    link: from([authMiddleware(req)]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache as any, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: Record<string, unknown> & { props: Record<string, unknown> }
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
