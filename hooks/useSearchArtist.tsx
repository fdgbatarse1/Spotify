import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import { ErrorMessages, PaginationOptions, Status } from '@/lib/enums';
import paginationHelper from '@/lib/paginationHelper';

import {
  setArtists,
  setArtistsError,
  setArtistsStatus,
} from '@/store/features/artists/artistsSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';

const useSearchArtist = (pagination: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  useEffect(() => {
    dispatch(setArtistsStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setArtistsError(''));

      const getArtistsAsync = async () => {
        if (!searchQuery) return;
        try {
          const data = await spotifyApi.searchArtists(searchQuery, {
            limit: PaginationOptions.limit,
            offset: PaginationOptions.offset,
          });
          dispatch(setArtists(data.body.artists));
          dispatch(setArtistsStatus(Status.FULFILLED));
        } catch {
          dispatch(setArtistsError(ErrorMessages.errorGettingArtists));
          dispatch(setArtistsStatus(Status.REJECTED));
        }
      };

      const getArtistsWithPaginationAsync = async () => {
        if (!searchQuery) return;
        try {
          const pagination = paginationHelper({ page, limit });
          const data = await spotifyApi.searchArtists(searchQuery, {
            limit: pagination.limit,
            offset: pagination.offset,
          });
          const artists = data.body.artists;
          dispatch(setArtists(artists));
          dispatch(setArtistsStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setArtistsError(ErrorMessages.errorGettingArtists));
          dispatch(setArtistsStatus(Status.REJECTED));
        }
      };

      if (pagination) {
        getArtistsWithPaginationAsync();
      } else {
        getArtistsAsync();
      }
    }
  }, [dispatch, limit, page, pagination, searchQuery, session?.user?.accessToken, spotifyApi]);
};

export default useSearchArtist;
