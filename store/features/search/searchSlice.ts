import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface ISearchSlice {
  searchQuery: string;
  searchError: string;
  searchStatus: Status;
}

const initialState: ISearchSlice = {
  searchQuery: '',
  searchError: '',
  searchStatus: Status.FULFILLED,
};

const searchSlice = createSlice({
  name: Slices.SEARCH,
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchError: (state, action: PayloadAction<string>) => {
      state.searchError = action.payload;
    },
    setSearchStatus: (state, action: PayloadAction<Status>) => {
      state.searchStatus = action.payload;
    },
  },
});

export const { setSearch, setSearchError, setSearchStatus } = searchSlice.actions;

export default searchSlice.reducer;
