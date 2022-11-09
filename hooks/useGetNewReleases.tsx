import { useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@/lib/reduxHooks';
import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions } from '@/lib/enums';

import {
  setNewReleases,
  setNewReleasesError,
  setNewReleasesStatus,
} from '@/store/features/albums/albumsSlice';

import { ICustomSession } from '@/types/common';

import useAsync from './useAsync';
import useSpotify from './useSpotify';

const useGetNewReleases = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      const pagination = paginate ? paginationHelper({ page, limit }) : PaginationOptions;
      const data = await spotifyApi.getNewReleases({
        limit: pagination.limit,
        offset: pagination.offset,
        country: PaginationOptions.country,
      });
      const albums = data.body.albums;
      if (albums.items.length === 0) throw new Error('Not found');
      return albums;
    }
  }, [limit, page, paginate, spotifyApi, session?.user?.accessToken]);

  const { value, status, error } = useAsync<
    SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | undefined
  >(asyncFunction, true);

  useEffect(() => {
    dispatch(setNewReleasesStatus(status));
    dispatch(setNewReleasesError(error));
    if (value) {
      dispatch(setNewReleases(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetNewReleases;
