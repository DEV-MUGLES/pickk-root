import { useMemo } from 'react';

import { APOLLO_STATE_PROP_NAME } from './apollo.constants';
import { initializeApollo } from './apollo.service';

export function useApolloClient(pageProps: Record<string, unknown>) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
