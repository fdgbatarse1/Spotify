import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'ugc-image-upload',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-follow-modify',
  'user-follow-read',
  'user-read-recently-played',
  'user-read-playback-position',
  'user-top-read',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'app-remote-control',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
  'user-library-read',
].join(',');

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const SPOTIFY_AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID || '',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
});

export { SPOTIFY_AUTHORIZATION_URL };

export default spotifyApi;
