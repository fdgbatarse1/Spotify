import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import useSpotify from '@/hooks/useSpotify';

import { PaginationOptions, Status } from '@/lib/enums';
import { useAppDispatch } from '@/lib/reduxHooks';

import { setAlbums, setAlbumsError, setAlbumsStatus } from '@/store/features/albums/albumsSlice';

import { ICustomSession } from '@/types/common';
import paginationHelper from '@/lib/paginationHelper';

const useGetArtistAlbums = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { id, page, limit } = router.query;

  useEffect(() => {
    dispatch(setAlbumsStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setAlbumsError(''));
      const getAlbumsAsync = async () => {
        try {
          if (typeof id !== 'string') throw new Error();
          const defaultPagination = {
            limit: PaginationOptions.limit,
            offset: PaginationOptions.offset,
          };
          const pagination = paginate ? paginationHelper({ page, limit }) : defaultPagination;
          const data = await spotifyApi.getArtistAlbums(id, {
            limit: pagination.limit,
            offset: pagination.offset,
          });
          const albums = data.body;
          dispatch(setAlbums(albums));
          dispatch(setAlbumsStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setAlbumsError('Not found'));
          dispatch(setAlbumsStatus(Status.REJECTED));
        }
      };

      getAlbumsAsync();
    }
  }, [dispatch, id, limit, page, paginate, session?.user?.accessToken, spotifyApi]);
};

export default useGetArtistAlbums;
