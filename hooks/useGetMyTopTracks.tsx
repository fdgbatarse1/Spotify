import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions, Status, ErrorMessages } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import { setTracks, setTracksError, setTracksStatus } from '@/store/features/tracks/tracksSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';

const useGetMyTopTracks = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  useEffect(() => {
    dispatch(setTracksStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setTracksError(''));

      const getMyTopTracksAsync = async () => {
        try {
          const defaultPagination = {
            limit: PaginationOptions.limit,
            offset: PaginationOptions.offset,
          };
          const pagination = paginate ? paginationHelper({ page, limit }) : defaultPagination;
          const data = await spotifyApi.getMyTopTracks({
            limit: pagination.limit,
            offset: pagination.offset,
          });
          const tracks = data.body;
          dispatch(setTracks(tracks));
          dispatch(setTracksStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setTracksError(ErrorMessages.errorGettingTracks));
          dispatch(setTracksStatus(Status.REJECTED));
        }
      };

      getMyTopTracksAsync();
    }
  }, [dispatch, limit, page, paginate, session?.user?.accessToken, spotifyApi]);
};

export default useGetMyTopTracks;
