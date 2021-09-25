import App, { AppContext, AppProps } from 'next/app';
import { ApolloProvider, gql } from '@apollo/client';
import 'antd/dist/antd.css';
import { UserRole } from '@pickk/common';

import { createApolloClient, useApolloClient } from '@providers/apollo';

export default function AdminApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApolloClient(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

AdminApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.pathname === '/login') {
    return appProps;
  }

  try {
    const client = createApolloClient(appContext.ctx.req);
    const {
      data: { me },
    } = await client.query<{ me: { role: UserRole } }>({
      query: GET_ME,
    });

    if (!me || me.role !== UserRole.Admin) {
      throw new Error('권한 없음');
    }

    return { ...appProps, pageProps: { ...appProps.pageProps, me } };
  } catch {
    const { ctx } = appContext;

    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }
  }
};

const GET_ME = gql`
  query me {
    me {
      id
      nickname
      role
    }
  }
`;
