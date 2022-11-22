import singlePlaylistResponseHelper from '@/lib/singlePlaylistResponseHelper';

describe('Testing singlePlaylistResponseHelper', () => {
    
    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }

    const externalIds: SpotifyApi.ExternalIdObject = {}

    const userOwner: SpotifyApi.UserObjectPublic = {
        external_urls: externalUrls,
        href: '',
        id: '',
        type: 'user',
        uri: ''
    }

    const followersObject: SpotifyApi.FollowersObject = {
        href: null,
        total: 17
    }

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
        added_by: userOwner,
        is_local: false,
        track: track
    }

    const pagedTrackObject: SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject> = {
        href: '',
        items: [item],
        limit: 0,
        next: null,
        offset: 0,
        previous: null,
        total: 0
    }

    const playlist: SpotifyApi.SinglePlaylistResponse = {
        followers: followersObject,
        tracks: pagedTrackObject,
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
        type: 'playlist',
    image:
      'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: 'Unknown',
    owner: 'Unknown',
    description: 'No description',
    public: 'Private',
    id: undefined,
    }

    const res = singlePlaylistResponseHelper(playlist);
    expect(res).toMatchObject(expected);
  });
});
