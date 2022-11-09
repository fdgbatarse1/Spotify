import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { NotFound, Status } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setUserProfile,
  setUserProfileError,
  setUserProfileStatus,
} from '@/store/features/user/userSlice';

import { ICustomSession } from '@/types/common';

const useGetUser = () => {
  const { data: session }: ICustomSession = useSession();

  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserProfileStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setUserProfileError(''));
      const getArtistAsync = async () => {
        try {
          const id = session?.user?.username;
          if (typeof id !== 'string') throw new Error();
          const data = await spotifyApi.getUser(id);
          const userProfile = data.body;
          dispatch(setUserProfile(userProfile));
          dispatch(setUserProfileStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setUserProfileError(NotFound.notFound));
          dispatch(setUserProfileStatus(Status.REJECTED));
        }
      };

      getArtistAsync();
    }
  }, [dispatch, session?.user?.accessToken, session?.user?.username, spotifyApi]);
};

export default useGetUser;
