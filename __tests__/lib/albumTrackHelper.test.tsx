import albumTrackHelper from '@/lib/albumTrackHelper';

describe('Testing albumTrackHelper', () => {
    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }

    const track: SpotifyApi.TrackObjectSimplified = {
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

  it('should return valid track', () => {
    const expected = {
        name: 'Unknown',
        artists: 'Unknown',
        duration: '0:00',
        id: track.id
      };

    const res = albumTrackHelper({ track: track });
    expect(res).toMatchObject(expected);
  });
});
