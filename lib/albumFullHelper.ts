interface IalbumFullHelper {
  album: SpotifyApi.AlbumObjectFull | null;
}

const albumFullHelper = ({ album }: IalbumFullHelper) => {
  const newAlbum = {
    albumType: album?.type || 'album',
    image:
      album?.images[0].url ||
      'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: album?.name || 'Unknown',
    artists:
      Number(album?.artists.length) > 0
        ? album?.artists
            .map(function (item) {
              return item['name'];
            })
            .join(', ')
        : 'Unknown',
    date: album?.release_date || 'Unknown',
    tracks: album?.total_tracks || 0,
    id: album?.id,
  };

  return newAlbum;
};

export default albumFullHelper;
