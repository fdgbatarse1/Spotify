import artistHelper from '@/lib/artistHelper';

describe('Testing artistHelper', () => {

    const followersObject: SpotifyApi.FollowersObject = {
        href: null,
        total: 17
    }

    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }

    const artist: SpotifyApi.ArtistObjectFull = {
        followers: followersObject,
        genres: [],
        images: [],
        popularity: 17,
        name: 'test',
        id: '',
        type: 'artist',
        href: '',
        external_urls: externalUrls,
        uri: ''
    }

  it('should return valid artist', () => {
    const expected = {
        image: 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
        name: 'test',
        type: artist.type,
        id: artist.id,
        followers: followersObject.total.toLocaleString(undefined)
      };

    const res = artistHelper({ artist: artist });
    expect(res).toMatchObject(expected);
  });
});
