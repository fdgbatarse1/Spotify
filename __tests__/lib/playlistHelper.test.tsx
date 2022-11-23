import playlistHelper from '@/lib/playlistHelper';

describe('Testing playlistHelper', () => {
    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }
    const userOwner: SpotifyApi.UserObjectPublic = {
        external_urls: externalUrls,
        href: '',
        id: '',
        type: 'user',
        uri: ''
    }

    const playlist: SpotifyApi.PlaylistObjectSimplified = {
        tracks: {
            href: '',
            total: 0
        },
        collaborative: false,
        description: null,
        id: '',
        images: [],
        name: '',
        owner: userOwner,
        public: null,
        snapshot_id: '',
        type: 'playlist',
        href: '',
        external_urls: externalUrls,
        uri: ''
    }

  it('should return valid playlist', () => {
    const expected = {
        image: 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
        name: 'Unknown',
        description: '',
        id: playlist.id
    }

    const res = playlistHelper({ playlist: playlist });
    expect(res).toMatchObject(expected);
  });
});
