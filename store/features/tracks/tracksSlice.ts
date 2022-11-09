import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface ITracksSlice {
  isPlaying: boolean;
  currentTrack: SpotifyApi.TrackObjectFull | null;
  track: SpotifyApi.TrackObjectFull | null;
  trackError: string;
  trackStatus: Status;
  tracks?: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined | null;
  tracksError: string;
  tracksStatus: Status;
}

const initialState: ITracksSlice = {
  isPlaying: false,
  currentTrack: null,
  track: null,
  trackError: '',
  trackStatus: Status.PENDING,
  tracks: null,
  tracksError: '',
  tracksStatus: Status.PENDING,
};

const tracksSlice = createSlice({
  name: Slices.TRACKS,
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<SpotifyApi.TrackObjectFull | null>) => {
      state.currentTrack = action.payload;
    },
    setTrack: (state, action: PayloadAction<SpotifyApi.TrackObjectFull>) => {
      state.track = action.payload;
    },
    removeTrack: (state) => {
      state.track = null;
    },
    setTrackError: (state, action: PayloadAction<string>) => {
      state.trackError = action.payload;
    },
    setTrackStatus: (state, action: PayloadAction<Status>) => {
      state.trackStatus = action.payload;
    },
    setTracks: (
      state,
      action: PayloadAction<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined | null>,
    ) => {
      state.tracks = action.payload;
    },
    setTracksError: (state, action: PayloadAction<string>) => {
      state.tracksError = action.payload;
    },
    setTracksStatus: (state, action: PayloadAction<Status>) => {
      state.tracksStatus = action.payload;
    },
  },
});

export const {
  setIsPlaying,
  setCurrentTrack,
  setTrack,
  removeTrack,
  setTrackError,
  setTrackStatus,
  setTracks,
  setTracksError,
  setTracksStatus,
} = tracksSlice.actions;

export default tracksSlice.reducer;
