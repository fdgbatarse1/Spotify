import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { PaginationOptions, Status } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setTopTracks,
  setTopTracksError,
  setTopTracksStatus,
} from '@/store/features/artists/artistsSlice';

import { ICustomSession } from '@/types/common';

const useGetArtistTopTracks = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  useEffect(() => {
    dispatch(setTopTracksStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setTopTracksError(''));
      const getTracksAsync = async () => {
        try {
          if (typeof id !== 'string') throw new Error();
          const data = await spotifyApi.getArtistTopTracks(id, PaginationOptions.country);
          const tracks = data.body.tracks;
          dispatch(setTopTracks(tracks));
          dispatch(setTopTracksStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setTopTracksError('Not found'));
          dispatch(setTopTracksStatus(Status.REJECTED));
        }
      };

      getTracksAsync();
    }
  }, [dispatch, id, session?.user?.accessToken, spotifyApi]);
};

export default useGetArtistTopTracks;
