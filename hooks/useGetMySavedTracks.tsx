import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setFavoriteTracks,
  setFavoriteTracksError,
  setFavoriteTracksStatus,
} from '@/store/features/favorites/favoritesSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';
import useAsync from './useAsync';

const useGetMySavedTracks = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      const pagination = paginate ? paginationHelper({ page, limit }) : PaginationOptions;
      const data = await spotifyApi.getMySavedTracks({
        limit: pagination.limit,
        offset: pagination.offset,
      });
      const tracks = data.body;
      return tracks;
    }
  }, [session?.user?.accessToken, paginate, page, limit, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.UsersSavedTracksResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setFavoriteTracksStatus(status));
    dispatch(setFavoriteTracksError(error));
    if (value) {
      dispatch(setFavoriteTracks(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetMySavedTracks;
