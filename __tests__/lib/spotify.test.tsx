import spotify from '@/lib/spotify';
import SpotifyWebApi from 'spotify-web-api-node';

describe('Testing ', () => {

  it('should return valid playlist', () => {
    const expected = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID || '',
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    });

    const res = spotify;
    expect(res).toMatchObject(expected);
  });
});
