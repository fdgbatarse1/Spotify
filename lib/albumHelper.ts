interface IalbumHelper {
  album: SpotifyApi.AlbumObjectSimplified;
}

const albumHelper = ({ album }: IalbumHelper) => {
  const newAlbum = {
    image: album.images[0]
      ? album.images[0].url
      : 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: album.name ? album.name : 'Unknown',
    artists:
      album.artists.length > 0
        ? album.artists
            .map(function (item) {
              return item['name'];
            })
            .join(', ')
        : 'Unknown',
    id: album.id,
  };

  return newAlbum;
};

export default albumHelper;
