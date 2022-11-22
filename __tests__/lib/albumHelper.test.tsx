import albumHelper from '@/lib/albumHelper';

describe('Testing albumHelper', () => {
    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }

    const album : SpotifyApi.AlbumObjectSimplified = {
        album_type: 'album',
        artists: [],
        id: '',
        images: [],
        name: '',
        release_date: '',
        release_date_precision: 'day',
        type: 'album',
        total_tracks: 0,
        href: '',
        external_urls: externalUrls,
        uri: ''
    }

  it('should return valid album', () => {
    const expected = {
        image: 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
        name: 'Unknown',
        artists: 'Unknown',
        id: album.id
      };

    const res = albumHelper({ album: album });
    expect(res).toMatchObject(expected);
  });
});
