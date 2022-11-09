import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions, Status, ErrorMessages } from '@/lib/enums';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';

import { setAlbums, setAlbumsError, setAlbumsStatus } from '@/store/features/albums/albumsSlice';

import { ICustomSession } from '@/types/common';

import useSpotify from './useSpotify';

const useSearchAlbum = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  useEffect(() => {
    dispatch(setAlbumsStatus(Status.PENDING));
    if (spotifyApi.getAccessToken()) {
      dispatch(setAlbumsError(''));

      const getAlbumsAsync = async () => {
        if (!searchQuery) return;
        try {
          const defaultPagination = {
            limit: PaginationOptions.limit,
            offset: PaginationOptions.offset,
          };
          const pagination = paginate ? paginationHelper({ page, limit }) : defaultPagination;
          const data = await spotifyApi.searchAlbums(searchQuery, {
            limit: pagination.limit,
            offset: pagination.offset,
          });
          const albums = data.body.albums;
          dispatch(setAlbums(albums));
          dispatch(setAlbumsStatus(Status.FULFILLED));
        } catch (e: unknown) {
          dispatch(setAlbumsError(ErrorMessages.errorGettingAlbums));
          dispatch(setAlbumsStatus(Status.REJECTED));
        }
      };

      getAlbumsAsync();
    }
  }, [dispatch, limit, page, paginate, searchQuery, session?.user?.accessToken, spotifyApi]);
};

export default useSearchAlbum;
