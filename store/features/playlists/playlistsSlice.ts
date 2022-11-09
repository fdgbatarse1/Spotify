import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface IPlaylistsSlice {
  playlist: SpotifyApi.SinglePlaylistResponse | null;
  playlistError: string;
  playlistStatus: Status;
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse | null;
  playlistsError: string;
  playlistsStatus: Status;
  playlistTracks: SpotifyApi.PlaylistTrackResponse | null;
  playlistTracksError: string;
  playlistTracksStatus: Status;
  featuredPlaylists?: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> | null;
  featuredPlaylistsError: string;
  featuredPlaylistsStatus: Status;
}

const initialState: IPlaylistsSlice = {
  playlist: null,
  playlistError: '',
  playlistStatus: Status.PENDING,
  playlists: null,
  playlistsError: '',
  playlistsStatus: Status.PENDING,
  playlistTracks: null,
  playlistTracksError: '',
  playlistTracksStatus: Status.PENDING,
  featuredPlaylists: null,
  featuredPlaylistsError: '',
  featuredPlaylistsStatus: Status.PENDING,
};

const playlistsSlice = createSlice({
  name: Slices.PLAYLISTS,
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<SpotifyApi.SinglePlaylistResponse>) => {
      state.playlist = action.payload;
    },
    removePlaylist: (state) => {
      state.playlist = null;
    },
    setPlaylistError: (state, action: PayloadAction<string>) => {
      state.playlistError = action.payload;
    },
    setPlaylistStatus: (state, action: PayloadAction<Status>) => {
      state.playlistStatus = action.payload;
    },
    setPlaylistTracks: (state, action: PayloadAction<SpotifyApi.PlaylistTrackResponse>) => {
      state.playlistTracks = action.payload;
    },
    setPlaylistTracksError: (state, action: PayloadAction<string>) => {
      state.playlistTracksError = action.payload;
    },
    setPlaylistTracksStatus: (state, action: PayloadAction<Status>) => {
      state.playlistTracksStatus = action.payload;
    },
    setFeaturedPlaylists: (
      state,
      action: PayloadAction<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>>,
    ) => {
      state.featuredPlaylists = action.payload;
    },
    setFeaturedPlaylistsError: (state, action: PayloadAction<string>) => {
      state.featuredPlaylistsError = action.payload;
    },
    setFeaturedPlaylistsStatus: (state, action: PayloadAction<Status>) => {
      state.featuredPlaylistsStatus = action.payload;
    },
    setPlaylists: (
      state,
      action: PayloadAction<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> | null>,
    ) => {
      state.playlists = action.payload;
    },
    setPlaylistsError: (state, action: PayloadAction<string>) => {
      state.playlistsError = action.payload;
    },
    setPlaylistsStatus: (state, action: PayloadAction<Status>) => {
      state.playlistsStatus = action.payload;
    },
  },
});

export const {
  setPlaylist,
  removePlaylist,
  setPlaylistError,
  setPlaylistStatus,
  setPlaylistTracks,
  setPlaylistTracksError,
  setPlaylistTracksStatus,
  setPlaylists,
  setPlaylistsError,
  setPlaylistsStatus,
  setFeaturedPlaylists,
  setFeaturedPlaylistsError,
  setFeaturedPlaylistsStatus,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
