import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { PaginationOptions } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setAlbum,
  removeAlbum,
  setAlbumError,
  setAlbumStatus,
} from '@/store/features/albums/albumsSlice';

import { ICustomSession } from '@/types/common';
import useAsync from './useAsync';

const useGetAlbum = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      if (typeof id !== 'string') throw new Error();
      const data = await spotifyApi.getAlbum(id, { market: PaginationOptions.market });
      const album = data.body;
      return album;
    }
  }, [session?.user?.accessToken, id, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.SingleAlbumResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setAlbumStatus(status));
    dispatch(setAlbumError(error));
    if (value) {
      dispatch(setAlbum(value));
    }
    return () => {
      dispatch(removeAlbum());
    };
  }, [dispatch, error, status, value]);
};

export default useGetAlbum;
