import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface IAlbumsSlice {
  album: SpotifyApi.AlbumObjectFull | null;
  albumError: string;
  albumStatus: Status;
  albumTracks: SpotifyApi.AlbumTracksResponse | null;
  albumTracksError: string;
  albumTracksStatus: Status;
  newReleases?: SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | null;
  newReleasesError: string;
  newReleasesStatus: Status;
  albums?: SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | undefined | null;
  albumsError: string;
  albumsStatus: Status;
}

const initialState: IAlbumsSlice = {
  album: null,
  albumError: '',
  albumStatus: Status.PENDING,
  albumTracks: null,
  albumTracksError: '',
  albumTracksStatus: Status.PENDING,
  newReleases: null,
  newReleasesError: '',
  newReleasesStatus: Status.PENDING,
  albums: null,
  albumsError: '',
  albumsStatus: Status.PENDING,
};

const albumsSlice = createSlice({
  name: Slices.ALBUMS,
  initialState,
  reducers: {
    setAlbum: (state, action: PayloadAction<SpotifyApi.AlbumObjectFull>) => {
      state.album = action.payload;
    },
    removeAlbum: (state) => {
      state.album = null;
    },
    setAlbumError: (state, action: PayloadAction<string>) => {
      state.albumError = action.payload;
    },
    setAlbumStatus: (state, action: PayloadAction<Status>) => {
      state.albumStatus = action.payload;
    },
    setAlbumTracks: (state, action: PayloadAction<SpotifyApi.AlbumTracksResponse>) => {
      state.albumTracks = action.payload;
    },
    setAlbumTracksError: (state, action: PayloadAction<string>) => {
      state.albumTracksError = action.payload;
    },
    setAlbumTracksStatus: (state, action: PayloadAction<Status>) => {
      state.albumTracksStatus = action.payload;
    },
    setNewReleases: (
      state,
      action: PayloadAction<SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>>,
    ) => {
      state.newReleases = action.payload;
    },
    setNewReleasesError: (state, action: PayloadAction<string>) => {
      state.newReleasesError = action.payload;
    },
    setNewReleasesStatus: (state, action: PayloadAction<Status>) => {
      state.newReleasesStatus = action.payload;
    },
    setAlbums: (
      state,
      action: PayloadAction<
        SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | undefined | null
      >,
    ) => {
      state.albums = action.payload;
    },
    setAlbumsError: (state, action: PayloadAction<string>) => {
      state.albumsError = action.payload;
    },
    setAlbumsStatus: (state, action: PayloadAction<Status>) => {
      state.albumsStatus = action.payload;
    },
  },
});

export const {
  setAlbum,
  removeAlbum,
  setAlbumError,
  setAlbumStatus,
  setAlbumTracks,
  setAlbumTracksError,
  setAlbumTracksStatus,
  setNewReleases,
  setNewReleasesError,
  setNewReleasesStatus,
  setAlbums,
  setAlbumsError,
  setAlbumsStatus,
} = albumsSlice.actions;

export default albumsSlice.reducer;
