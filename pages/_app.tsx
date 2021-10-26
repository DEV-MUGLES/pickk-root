import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import 'antd/dist/antd.css';

import { useApolloClient } from '@providers/apollo';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function AdminApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApolloClient(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
