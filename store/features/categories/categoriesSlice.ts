import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface IcategoriesSlice {
  categories?: SpotifyApi.PagingObject<SpotifyApi.CategoryObject> | null;
  categoriesError: string;
  categoriesStatus: Status;
}

const initialState: IcategoriesSlice = {
  categories: null,
  categoriesError: '',
  categoriesStatus: Status.PENDING,
};

const categoriesSlice = createSlice({
  name: Slices.CATEGORIES,
  initialState,
  reducers: {
    setCategories: (
      state,
      action: PayloadAction<SpotifyApi.PagingObject<SpotifyApi.CategoryObject>>,
    ) => {
      state.categories = action.payload;
    },
    setCategoriesError: (state, action: PayloadAction<string>) => {
      state.categoriesError = action.payload;
    },
    setCategoriesStatus: (state, action: PayloadAction<Status>) => {
      state.categoriesStatus = action.payload;
    },
  },
});

export const { setCategories, setCategoriesError, setCategoriesStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer;
