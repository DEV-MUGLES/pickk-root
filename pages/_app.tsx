import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import { useApolloClient } from '@providers/apollo';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApolloClient(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
