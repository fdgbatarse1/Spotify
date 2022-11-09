import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface IFavoritesSlice {
  favoriteTracks?: SpotifyApi.UsersSavedTracksResponse | null;
  favoriteTracksError: string;
  favoriteTracksStatus: Status;
  favoriteAlbums?: SpotifyApi.UsersSavedAlbumsResponse | null;
  favoriteAlbumsError: string;
  favoriteAlbumsStatus: Status;
}

const initialState: IFavoritesSlice = {
  favoriteTracks: null,
  favoriteTracksError: '',
  favoriteTracksStatus: Status.PENDING,
  favoriteAlbums: null,
  favoriteAlbumsError: '',
  favoriteAlbumsStatus: Status.PENDING,
};

const favoritesSlice = createSlice({
  name: Slices.FAVORITES,
  initialState,
  reducers: {
    setFavoriteTracks: (
      state,
      action: PayloadAction<SpotifyApi.UsersSavedTracksResponse | null>,
    ) => {
      state.favoriteTracks = action.payload;
    },
    setFavoriteTracksError: (state, action: PayloadAction<string>) => {
      state.favoriteTracksError = action.payload;
    },
    setFavoriteTracksStatus: (state, action: PayloadAction<Status>) => {
      state.favoriteTracksStatus = action.payload;
    },
    setFavoriteAlbums: (
      state,
      action: PayloadAction<SpotifyApi.UsersSavedAlbumsResponse | null>,
    ) => {
      state.favoriteAlbums = action.payload;
    },
    setFavoriteAlbumsError: (state, action: PayloadAction<string>) => {
      state.favoriteAlbumsError = action.payload;
    },
    setFavoriteAlbumsStatus: (state, action: PayloadAction<Status>) => {
      state.favoriteAlbumsStatus = action.payload;
    },
  },
});

export const {
  setFavoriteTracks,
  setFavoriteTracksError,
  setFavoriteTracksStatus,
  setFavoriteAlbums,
  setFavoriteAlbumsError,
  setFavoriteAlbumsStatus,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
