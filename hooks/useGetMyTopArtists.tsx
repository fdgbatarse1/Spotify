import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions, Status, ErrorMessages } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setArtists,
  setArtistsError,
  setArtistsStatus,
} from '@/store/features/artists/artistsSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';

const useGetMyTopArtists = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  useEffect(() => {
    dispatch(setArtistsStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setArtistsError(''));

      const getMyTopArtistsAsync = async () => {
        try {
          const defaultPagination = {
            limit: PaginationOptions.limit,
            offset: PaginationOptions.offset,
          };
          const pagination = paginate ? paginationHelper({ page, limit }) : defaultPagination;
          const data = await spotifyApi.getMyTopArtists({
            limit: pagination.limit,
            offset: pagination.offset,
          });
          const artists = data.body;
          dispatch(setArtists(artists));
          dispatch(setArtistsStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setArtistsError(ErrorMessages.errorGettingArtists));
          dispatch(setArtistsStatus(Status.REJECTED));
        }
      };

      getMyTopArtistsAsync();
    }
  }, [dispatch, limit, page, paginate, session?.user?.accessToken, spotifyApi]);
};

export default useGetMyTopArtists;
