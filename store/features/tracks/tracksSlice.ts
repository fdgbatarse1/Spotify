import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Slices, Status } from "@/lib/enums";
import { SpotifyPlayerTrack } from "react-spotify-web-playback/lib";

interface ITracksSlice {
  isPlaying: boolean;
  currentTrack:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.TrackObjectSimplified
    | SpotifyPlayerTrack
    | null;
  track:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.TrackObjectSimplified
    | SpotifyPlayerTrack
    | null;
  trackError: string;
  trackStatus: Status;
  tracks?:
    | SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>
    | SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified>
    | SpotifyApi.PagingObject<SpotifyPlayerTrack>
    | undefined
    | null;
  tracksError: string;
  tracksStatus: Status;
}

const initialState: ITracksSlice = {
  isPlaying: false,
  currentTrack: null,
  track: null,
  trackError: "",
  trackStatus: Status.PENDING,
  tracks: null,
  tracksError: "",
  tracksStatus: Status.PENDING,
};

const tracksSlice = createSlice({
  name: Slices.TRACKS,
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<
        | SpotifyApi.TrackObjectFull
        | SpotifyApi.TrackObjectSimplified
        | SpotifyPlayerTrack
        | null
      >
    ) => {
      state.currentTrack = action.payload;
    },
    setTrack: (
      state,
      action: PayloadAction<
        | SpotifyApi.TrackObjectFull
        | SpotifyApi.TrackObjectSimplified
        | SpotifyPlayerTrack
      >
    ) => {
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
      action: PayloadAction<
        | SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>
        | SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified>
        | SpotifyApi.PagingObject<SpotifyPlayerTrack>
        | undefined
        | null
      >
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
