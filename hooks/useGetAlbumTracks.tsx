import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setAlbumTracks,
  setAlbumTracksError,
  setAlbumTracksStatus,
} from '@/store/features/albums/albumsSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';
import useAsync from './useAsync';

const useGetAlbumTracks = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id, page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      if (typeof id !== 'string') throw new Error();
      const pagination = paginationHelper({ page, limit });
      const data = await spotifyApi.getAlbumTracks(id, {
        limit: pagination.limit,
        offset: pagination.offset,
      });
      const albumTracks = data.body;
      return albumTracks;
    }
  }, [session?.user?.accessToken, id, page, limit, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.AlbumTracksResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setAlbumTracksStatus(status));
    dispatch(setAlbumTracksError(error));
    if (value) {
      dispatch(setAlbumTracks(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetAlbumTracks;
