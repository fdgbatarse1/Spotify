import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slices, Status } from '@/lib/enums';

interface IUserSlice {
  userProfile: SpotifyApi.UserProfileResponse | null;
  userProfileError: string;
  userProfileStatus: Status;
  followedArtists?:
    | SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>
    | undefined
    | null;
  followedArtistsError: string;
  followedArtistsStatus: Status;
}

const initialState: IUserSlice = {
  userProfile: null,
  userProfileError: '',
  userProfileStatus: Status.PENDING,
  followedArtists: null,
  followedArtistsError: '',
  followedArtistsStatus: Status.PENDING,
};

const userSlice = createSlice({
  name: Slices.USER,
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<SpotifyApi.UserProfileResponse | null>) => {
      state.userProfile = action.payload;
    },
    setUserProfileError: (state, action: PayloadAction<string>) => {
      state.userProfileError = action.payload;
    },
    setUserProfileStatus: (state, action: PayloadAction<Status>) => {
      state.userProfileStatus = action.payload;
    },
    setFollowedArtists: (
      state,
      action: PayloadAction<
        SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull> | undefined | null
      >,
    ) => {
      state.followedArtists = action.payload;
    },
    setFollowedArtistsError: (state, action: PayloadAction<string>) => {
      state.followedArtistsError = action.payload;
    },
    setFollowedArtistsStatus: (state, action: PayloadAction<Status>) => {
      state.followedArtistsStatus = action.payload;
    },
  },
});

export const {
  setUserProfile,
  setUserProfileError,
  setUserProfileStatus,
  setFollowedArtists,
  setFollowedArtistsError,
  setFollowedArtistsStatus,
} = userSlice.actions;

export default userSlice.reducer;
