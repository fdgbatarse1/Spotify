import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { useAppDispatch } from '@/lib/reduxHooks';

import {
  setPlaylistTracks,
  setPlaylistTracksError,
  setPlaylistTracksStatus,
} from '@/store/features/playlists/playlistsSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';
import useAsync from './useAsync';

const useGetPlaylistTracks = () => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id, page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      if (typeof id !== 'string') throw new Error();
      const pagination = paginationHelper({ page, limit });
      const data = await spotifyApi.getPlaylistTracks(id, {
        limit: pagination.limit,
        offset: pagination.offset,
      });
      const playlistTracks = data.body;
      return playlistTracks;
    }
  }, [session?.user?.accessToken, id, page, limit, spotifyApi]);

  const { value, status, error } = useAsync<SpotifyApi.PlaylistTrackResponse | undefined>(
    asyncFunction,
    true,
  );

  useEffect(() => {
    dispatch(setPlaylistTracksStatus(status));
    dispatch(setPlaylistTracksError(error));
    if (value) {
      dispatch(setPlaylistTracks(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetPlaylistTracks;
