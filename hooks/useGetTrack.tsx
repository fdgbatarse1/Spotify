import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { Status, PaginationOptions, NotFound } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setTrackStatus,
  setTrackError,
  setTrack,
  removeTrack,
} from '@/store/features/tracks/tracksSlice';

import { ICustomSession } from '@/types/common';

const useGetTrack = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id, page, limit } = router.query;

  useEffect(() => {
    dispatch(setTrackStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setTrackError(''));
      const getTrackAsync = async () => {
        try {
          if (typeof id !== 'string') throw new Error();
          const data = await spotifyApi.getTrack(id, { market: PaginationOptions.market });
          const track = data.body;
          dispatch(setTrack(track));
          dispatch(setTrackStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setTrackError(NotFound.notFound));
          dispatch(setTrackStatus(Status.REJECTED));
        }
      };

      getTrackAsync();
    }
    return () => {
      dispatch(removeTrack());
    };
  }, [dispatch, id, limit, page, session?.user?.accessToken, spotifyApi]);
};

export default useGetTrack;
