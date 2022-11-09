import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setFavoriteAlbums,
  setFavoriteAlbumsError,
  setFavoriteAlbumsStatus,
} from '@/store/features/favorites/favoritesSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';
import useAsync from './useAsync';

const useGetMySavedAlbums = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      const defaultPagination = {
        limit: PaginationOptions.limit,
        offset: PaginationOptions.offset,
      };
      const pagination = paginate ? paginationHelper({ page, limit }) : defaultPagination;
      const data = await spotifyApi.getMySavedAlbums({
        limit: pagination.limit,
        offset: pagination.offset,
      });
      const albums = data.body;
      return albums;
    }
  }, [session?.user?.accessToken, paginate, page, limit, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.UsersSavedAlbumsResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setFavoriteAlbumsStatus(status));
    dispatch(setFavoriteAlbumsError(error));
    if (value) {
      dispatch(setFavoriteAlbums(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetMySavedAlbums;
