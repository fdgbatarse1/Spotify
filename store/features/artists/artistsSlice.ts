import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface IArtistsSlice {
  artist: SpotifyApi.ArtistObjectFull | null;
  artistError: string;
  artistStatus: Status;
  artists?: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | undefined | null;
  artistsError: string;
  artistsStatus: Status;
  topTracks?: SpotifyApi.TrackObjectFull[] | undefined | null;
  topTracksError: string;
  topTracksStatus: Status;
  relatedArtists?: SpotifyApi.ArtistObjectFull[] | undefined | null;
  relatedArtistsError: string;
  relatedArtistsStatus: Status;
}

const initialState: IArtistsSlice = {
  artist: null,
  artistError: '',
  artistStatus: Status.PENDING,
  artists: null,
  artistsError: '',
  artistsStatus: Status.PENDING,
  topTracks: null,
  topTracksError: '',
  topTracksStatus: Status.PENDING,
  relatedArtists: null,
  relatedArtistsError: '',
  relatedArtistsStatus: Status.PENDING,
};

const artistsSlice = createSlice({
  name: Slices.ARTISTS,
  initialState,
  reducers: {
    setArtist: (state, action: PayloadAction<SpotifyApi.ArtistObjectFull>) => {
      state.artist = action.payload;
    },
    removeArtist: (state) => {
      state.artist = null;
    },
    setArtistError: (state, action: PayloadAction<string>) => {
      state.artistError = action.payload;
    },
    setArtistStatus: (state, action: PayloadAction<Status>) => {
      state.artistStatus = action.payload;
    },
    setArtists: (
      state,
      action: PayloadAction<
        SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | undefined | null
      >,
    ) => {
      state.artists = action.payload;
    },
    setArtistsError: (state, action: PayloadAction<string>) => {
      state.artistsError = action.payload;
    },
    setArtistsStatus: (state, action: PayloadAction<Status>) => {
      state.artistsStatus = action.payload;
    },
    setTopTracks: (
      state,
      action: PayloadAction<SpotifyApi.TrackObjectFull[] | undefined | null>,
    ) => {
      state.topTracks = action.payload;
    },
    setTopTracksError: (state, action: PayloadAction<string>) => {
      state.topTracksError = action.payload;
    },
    setTopTracksStatus: (state, action: PayloadAction<Status>) => {
      state.topTracksStatus = action.payload;
    },
    setRelatedArtists: (
      state,
      action: PayloadAction<SpotifyApi.ArtistObjectFull[] | undefined | null>,
    ) => {
      state.relatedArtists = action.payload;
    },
    setRelatedArtistsError: (state, action: PayloadAction<string>) => {
      state.relatedArtistsError = action.payload;
    },
    setRelatedArtistsStatus: (state, action: PayloadAction<Status>) => {
      state.relatedArtistsStatus = action.payload;
    },
  },
});

export const {
  setArtist,
  removeArtist,
  setArtistError,
  setArtistStatus,
  setArtists,
  setArtistsError,
  setArtistsStatus,
  setTopTracks,
  setTopTracksError,
  setTopTracksStatus,
  setRelatedArtists,
  setRelatedArtistsError,
  setRelatedArtistsStatus,
} = artistsSlice.actions;

export default artistsSlice.reducer;
