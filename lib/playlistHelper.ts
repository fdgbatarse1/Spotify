interface IplaylistHelper {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

const playlistHelper = ({ playlist }: IplaylistHelper) => {
  const newPlaylist = {
    image: playlist.images[0]
      ? playlist.images[0].url
      : 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: playlist.name ? playlist.name : 'Unknown',
    description: playlist.description ? playlist.description.replace(/<\/?[^>]+(>|$)/g, '') : '',
    id: playlist.id,
  };

  return newPlaylist;
};

export default playlistHelper;
