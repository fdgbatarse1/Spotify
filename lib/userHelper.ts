interface IuserHelper {
  user: SpotifyApi.UserProfileResponse | null;
}

const userHelper = ({ user }: IuserHelper) => {
  const newTrack = {
    image: user?.images
      ? user.images[0]?.url ||
        'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
      : 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: user?.display_name || 'Unknown',
    followers: user?.followers?.total || 0,
    type: user?.type || 'Unknown',
    id: user?.id,
  };
  return newTrack;
};

export default userHelper;
