import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { PaginationOptions } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setPlaylist,
  removePlaylist,
  setPlaylistError,
  setPlaylistStatus,
} from '@/store/features/playlists/playlistsSlice';

import { ICustomSession } from '@/types/common';

import useAsync from './useAsync';

const useGetPlaylist = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      if (typeof id !== 'string') throw new Error();
      const data = await spotifyApi.getPlaylist(id, { market: PaginationOptions.market });
      const playlist = data.body;
      return playlist;
    }
  }, [session?.user?.accessToken, id, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.SinglePlaylistResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setPlaylistStatus(status));
    dispatch(setPlaylistError(error));
    if (value) {
      dispatch(setPlaylist(value));
    }
    return () => {
      dispatch(removePlaylist());
    };
  }, [dispatch, error, status, value]);
};

export default useGetPlaylist;
