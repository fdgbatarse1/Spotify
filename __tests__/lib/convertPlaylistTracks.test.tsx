import convertPlaylistTracks from '@/lib/convertPlaylistTracks';

describe('Testing convertPlaylistTracks', () => {

    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }

    const userObject: SpotifyApi.UserObjectPublic = {
        external_urls: externalUrls,
        href: '',
        id: '',
        type: 'user',
        uri: ''
    }

    const externalIds: SpotifyApi.ExternalIdObject = {}

    const pagedTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified> = {
        href: '',
        items: [],
        limit: 0,
        next: null,
        offset: 0,
        previous: null,
        total: 0
    }

    const album: SpotifyApi.AlbumObjectFull = {
        copyrights: [],
        external_ids: externalIds,
        genres: [],
        label: '',
        popularity: 0,
        tracks: pagedTracks,
        album_type: 'album',
        artists: [],
        id: '',
        images: [],
        name: '',
        release_date: '',
        release_date_precision: 'year',
        type: 'album',
        total_tracks: 0,
        href: '',
        external_urls: externalUrls,
        uri: ''
    }

    const track: SpotifyApi.TrackObjectFull = {
        album: album,
        external_ids: externalIds,
        popularity: 0,
        artists: [],
        disc_number: 0,
        duration_ms: 0,
        explicit: false,
        external_urls: externalUrls,
        href: '',
        id: '',
        name: '',
        preview_url: null,
        track_number: 0,
        type: 'track',
        uri: ''
    }

    const item: SpotifyApi.PlaylistTrackObject = {
        added_at: '',
        added_by: userObject,
        is_local: false,
        track: track
    }

    const playlistTracks: SpotifyApi.PlaylistTrackResponse = {
        href: '',
        items: [item],
        limit: 0,
        next: null,
        offset: 0,
        previous: null,
        total: 0
    }

  it('should return valid tracks', () => {
    const expected = [ track ]

    const res = convertPlaylistTracks(playlistTracks);
    expect(res).toMatchObject(expected);
  });
});
