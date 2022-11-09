import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setPlaylists,
  setPlaylistsError,
  setPlaylistsStatus,
} from '@/store/features/playlists/playlistsSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';
import useAsync from './useAsync';

const useGetMyPlaylists = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      const pagination = paginate ? paginationHelper({ page, limit }) : PaginationOptions;
      const data = await spotifyApi.getUserPlaylists({
        limit: pagination.limit,
        offset: pagination.offset,
      });
      const playlist = data.body;
      return playlist;
    }
  }, [session?.user?.accessToken, paginate, page, limit, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.ListOfUsersPlaylistsResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setPlaylistsStatus(status));
    dispatch(setPlaylistsError(error));
    if (value) {
      dispatch(setPlaylists(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetMyPlaylists;
