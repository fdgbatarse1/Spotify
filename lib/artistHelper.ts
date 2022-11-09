interface IartistHelper {
  artist: SpotifyApi.ArtistObjectFull | null;
}

const artistHelper = ({ artist }: IartistHelper) => {
  const newAlbum = {
    image: artist?.images[0]
      ? artist?.images[0].url
      : 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: artist?.name ? artist?.name : 'Unknown',
    type: artist?.type ? artist?.type : 'Unknown',
    id: artist?.id,
    followers: artist?.followers?.total
      ? artist?.followers?.total.toLocaleString(undefined)
      : 'Unknown',
  };

  return newAlbum;
};

export default artistHelper;
