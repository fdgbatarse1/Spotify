import albumFullHelper from '@/lib/albumFullHelper';

describe('Testing albumFullHelper', () => {
    const albumTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified> = {
        href: '',
        items: [],
        limit: 0,
        next: null,
        offset: 0,
        previous: null,
        total: 0
    }

    const externalIds: SpotifyApi.ExternalIdObject = {}

    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }

    const image: SpotifyApi.ImageObject = {
        url: 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
    }

    const album : SpotifyApi.AlbumObjectFull = {
        copyrights: [],
        external_ids: externalIds,
        genres: [],
        label: '',
        popularity: 0,
        tracks: albumTracks,
        album_type: 'album',
        artists: [],
        id: '',
        images: [image],
        name: 'album test',
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
        albumType: 'album',
        image: 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
        name: 'album test',
        artists:
        'Unknown',
        date: 'Unknown',
        tracks: 0,
        id: album.id,
      };

    const res = albumFullHelper({ album: album});
    expect(res).toMatchObject(expected);
  });
});
