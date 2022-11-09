import { configureStore } from '@reduxjs/toolkit';

import albumsReducer from './features/albums/albumsSlice';
import playlistsReducer from './features/playlists/playlistsSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import tracksReducer from './features/tracks/tracksSlice';
import searchReducer from './features/search/searchSlice';
import artistsReducer from './features/artists/artistsSlice';
import favoritesReducer from './features/favorites/favoritesSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    playlists: playlistsReducer,
    categories: categoriesReducer,
    tracks: tracksReducer,
    search: searchReducer,
    artists: artistsReducer,
    favorites: favoritesReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
