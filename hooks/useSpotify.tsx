import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';

import { ICustomSession } from '@/types/common';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID || '',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
});

const useSpotify = () => {
  const { data: session }: ICustomSession = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session?.user?.accessToken || '');
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
