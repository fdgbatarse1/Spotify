import userHelper from '@/lib/userHelper';

describe('Testing userHelper', () => {
  const user: SpotifyApi.UserProfileResponse = {
    display_name: 'Batar',
    external_urls: {
      spotify: 'https://open.spotify.com/user/11asfwfw6bfgsapzwcemztj0a',
    },
    followers: {
      href: null,
      total: 1,
    },
    href: 'https://api.spotify.com/v1/users/11asfwfw6bfgsapzwcemztj0a',
    id: '11asfwfw6bfgsapzwcemztj0a',
    images: [
      {
        height: undefined,
        url: 'https://i.scdn.co/image/ab6775700000ee852af486cb0bcf305543f3f146',
        width: undefined,
      },
    ],
    type: 'user',
    uri: 'spotify:user:11asfwfw6bfgsapzwcemztj0a',
  };

  it('should return valid invisible comic', () => {
    const expected = {
      image: 'https://i.scdn.co/image/ab6775700000ee852af486cb0bcf305543f3f146',
      name: 'Batar',
      followers: 1,
      type: 'user',
      id: '11asfwfw6bfgsapzwcemztj0a',
    };

    const res = userHelper({ user: user });
    expect(res).toMatchObject(expected);
  });
});
