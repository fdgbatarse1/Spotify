import { useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@/lib/reduxHooks';
import paginationHelper from '@/lib/paginationHelper';
import { PaginationOptions } from '@/lib/enums';

import {
  setCategories,
  setCategoriesError,
  setCategoriesStatus,
} from '@/store/features/categories/categoriesSlice';

import { ICustomSession } from '@/types/common';

import useAsync from './useAsync';
import useSpotify from './useSpotify';

const useGetCategories = (paginate: boolean) => {
  const { data: session }: ICustomSession = useSession();

  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const { page, limit } = router.query;

  const asyncFunction = useCallback(async () => {
    if (session?.user?.accessToken) {
      const pagination = paginate ? paginationHelper({ page, limit }) : PaginationOptions;
      const data = await spotifyApi.getCategories({
        limit: pagination.limit,
        offset: pagination.offset,
        country: pagination.country,
        locale: pagination.locale,
      });
      const categories = data.body.categories;
      if (categories.items.length === 0) throw new Error('Not found');
      return categories;
    }
  }, [limit, page, paginate, spotifyApi, session?.user?.accessToken]);

  const { value, status, error } = useAsync<
    SpotifyApi.PagingObject<SpotifyApi.CategoryObject> | undefined
  >(asyncFunction, true);

  useEffect(() => {
    dispatch(setCategoriesStatus(status));
    dispatch(setCategoriesError(error));
    if (value) {
      dispatch(setCategories(value));
    }
  }, [dispatch, error, status, value]);
};

export default useGetCategories;
