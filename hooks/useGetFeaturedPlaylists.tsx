import { useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@/lib/reduxHooks';
import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions } from '@/lib/enums';

import {
  setFeaturedPlaylists,
  setFeaturedPlaylistsError,
  setFeaturedPlaylistsStatus,
} from '@/store/features/playlists/playlistsSlice';

import { ICustomSession } from '@/types/common';

import useAsync from './useAsync';
import useSpotify from './useSpotify';

const useGetFeaturedPlaylists = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      const today = new Date();
      const pagination = paginate ? paginationHelper({ page, limit }) : PaginationOptions;
      const data = await spotifyApi.getFeaturedPlaylists({
        limit: pagination.limit,
        offset: pagination.offset,
        country: pagination.country,
        locale: pagination.locale,
        timestamp: today.toISOString(),
      });
      const playlists = data.body.playlists;
      if (playlists.items.length === 0) throw new Error('Not found');
      return playlists;
    }
  }, [limit, page, paginate, spotifyApi, session?.user?.accessToken]);

  const { value, status, error } = useAsync<
    SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> | undefined
  >(asyncFunction, true);

  useEffect(() => {
    dispatch(setFeaturedPlaylistsStatus(status));
    dispatch(setFeaturedPlaylistsError(error));
    if (value) {
      dispatch(setFeaturedPlaylists(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetFeaturedPlaylists;
