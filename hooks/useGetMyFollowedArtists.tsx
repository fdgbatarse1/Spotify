import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { PaginationOptions, Status, ErrorMessages } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setFollowedArtists,
  setFollowedArtistsError,
  setFollowedArtistsStatus,
} from '@/store/features/user/userSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';

const useGetMyFollowedArtists = () => {
  const { data: session }: ICustomSession = useSession();

  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFollowedArtistsStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setFollowedArtistsError(''));

      const getMyTopTracksAsync = async () => {
        try {
          const data = await spotifyApi.getFollowedArtists({
            limit: PaginationOptions.limit,
          });
          const followedArtists = data.body.artists;
          dispatch(setFollowedArtists(followedArtists));
          dispatch(setFollowedArtistsStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setFollowedArtistsError(ErrorMessages.errorGettingArtists));
          dispatch(setFollowedArtistsStatus(Status.REJECTED));
        }
      };

      getMyTopTracksAsync();
    }
  }, [dispatch, session?.user?.accessToken, spotifyApi]);
};

export default useGetMyFollowedArtists;
