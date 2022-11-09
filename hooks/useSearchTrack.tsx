import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import { ErrorMessages, PaginationOptions, Status } from '@/lib/enums';

import { setTracks, setTracksError, setTracksStatus } from '@/store/features/tracks/tracksSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';
import paginationHelper from '@/lib/paginationHelper';

const useSearchTrack = (pagination: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  useEffect(() => {
    dispatch(setTracksStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setTracksError(''));

      const getTracksAsync = async () => {
        if (!searchQuery) return;
        try {
          const data = await spotifyApi.searchTracks(searchQuery, {
            limit: PaginationOptions.limit,
            offset: PaginationOptions.offset,
          });
          dispatch(setTracks(data.body.tracks));
          dispatch(setTracksStatus(Status.FULFILLED));
        } catch {
          dispatch(setTracksError(ErrorMessages.errorGettingTracks));
          dispatch(setTracksStatus(Status.REJECTED));
        }
      };

      const getTracksWithPaginationAsync = async () => {
        if (!searchQuery) return;
        try {
          const pagination = paginationHelper({ page, limit });
          const data = await spotifyApi.searchTracks(searchQuery, {
            limit: pagination.limit,
            offset: pagination.offset,
          });
          const tracks = data.body.tracks;
          dispatch(setTracks(tracks));
          dispatch(setTracksStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setTracksError(ErrorMessages.errorGettingTracks));
          dispatch(setTracksStatus(Status.REJECTED));
        }
      };

      if (pagination) {
        getTracksWithPaginationAsync();
      } else {
        getTracksAsync();
      }
    }
  }, [dispatch, limit, page, pagination, searchQuery, session?.user?.accessToken, spotifyApi]);
};

export default useSearchTrack;
