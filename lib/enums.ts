const enum Routes {
  LOGIN = '/login',
  HOME = '/',
  SEARCH = '/search',
  YOUR_LIBRARY = '/your-library',
  PROFILE = '/profile',
}

const enum Navigation {
  HOME = 'Home',
  SEARCH = 'Search',
  YOUR_LIBRARY = 'Your Library',
  PROFILE = 'Profile',
  LOG_OUT = 'Log Out',
}

const enum Slices {
  ALBUMS = 'albums',
  PLAYLISTS = 'playlists',
  CATEGORIES = 'categories',
  TRACKS = 'tracks',
  SEARCH = 'search',
  ARTISTS = 'artists',
  FAVORITES = 'favorites',
  USER = 'user',
}

const enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

const PaginationOptions = {
  limit: 12,
  offset: 0,
  country: 'SV',
  locale: 'es_SV',
  market: 'SV',
};

const NotFound = {
  notFound: 'Not found',
};

const ErrorMessages = {
  notFound: 'Not found',
  errorGettingNewReleases: 'Error getting new releases',
  errorGettingFeaturedPlaylists: 'Error getting featured playlists',
  errorGettingCategories: 'Error getting categories',
  errorGettingAlbums: 'Error getting albums',
  errorGettingTracks: 'Error getting tracks',
  errorGettingArtists: 'Error getting artists',
};

Object.freeze(PaginationOptions);
Object.freeze(NotFound);
Object.freeze(ErrorMessages);

export { Routes, Navigation, Slices, Status, PaginationOptions, NotFound, ErrorMessages };
