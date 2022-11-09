import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { Status } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setRelatedArtists,
  setRelatedArtistsError,
  setRelatedArtistsStatus,
} from '@/store/features/artists/artistsSlice';

import { ICustomSession } from '@/types/common';

const useGetRelatedArtist = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  useEffect(() => {
    dispatch(setRelatedArtistsStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setRelatedArtistsError(''));
      const getRelatedArtistAsync = async () => {
        try {
          if (typeof id !== 'string') throw new Error();
          const data = await spotifyApi.getArtistRelatedArtists(id);
          const artists = data.body.artists;
          dispatch(setRelatedArtists(artists));
          dispatch(setRelatedArtistsStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setRelatedArtistsError('Not found'));
          dispatch(setRelatedArtistsStatus(Status.REJECTED));
        }
      };

      getRelatedArtistAsync();
    }
  }, [dispatch, id, session?.user?.accessToken, spotifyApi]);
};

export default useGetRelatedArtist;
