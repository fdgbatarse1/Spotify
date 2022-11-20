import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/Layout';

import '@/styles/globals.css';

const MyApp = ({ Component, pageProps: { session, ...pageProps }, router }: AppProps) => {
  if (
    router.pathname.valueOf() == '/' ||
    router.pathname.valueOf() == '/new-releases' ||
    router.pathname.valueOf() == '/featured-playlists' ||
    router.pathname.valueOf() == '/categories' ||
    router.pathname.valueOf() == '/profile' ||
    router.pathname.valueOf() == '/search' ||
    router.pathname.valueOf() == '/your-library' ||
    router.pathname.valueOf() == '/album/[id]' ||
    router.pathname.valueOf() == '/album/track/[id]' ||
    router.pathname.valueOf() == '/track/[id]' ||
    router.pathname.valueOf() == '/artist/[id]' ||
    router.pathname.valueOf() == '/search/albums' ||
    router.pathname.valueOf() == '/search/tracks' ||
    router.pathname.valueOf() == '/search/artists' ||
    router.pathname.valueOf() == '/artist/[id]/albums' ||
    router.pathname.valueOf() == '/your-library/albums' ||
    router.pathname.valueOf() == '/your-library/tracks' ||
    router.pathname.valueOf() == '/playlist/[id]' ||
    router.pathname.valueOf() == '/profile/artists' ||
    router.pathname.valueOf() == '/your-library/playlists'
  ) {
    return (
      <ThemeProvider enableSystem={true} attribute="class">
          <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
        </Provider>
      </SessionProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
    </ThemeProvider>
  );
};

export default MyApp;
