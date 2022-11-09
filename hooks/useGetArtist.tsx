import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setArtist,
  removeArtist,
  setArtistError,
  setArtistStatus,
} from '@/store/features/artists/artistsSlice';

import { ICustomSession } from '@/types/common';
import useAsync from './useAsync';

const useGetArtist = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      if (typeof id !== 'string') throw new Error();
      const data = await spotifyApi.getArtist(id);
      const artist = data.body;
      return artist;
    }
  }, [session?.user?.accessToken, id, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.SingleArtistResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setArtistStatus(status));
    dispatch(setArtistError(error));
    if (value) {
      dispatch(setArtist(value));
    }
    return () => {
      dispatch(removeArtist());
    };
  }, [dispatch, error, status, value]);
};

export default useGetArtist;
