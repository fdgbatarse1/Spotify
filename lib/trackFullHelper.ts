import msToMinutesAndSeconds from './msToMinutesAndSeconds';

interface ItrackFullHelper {
  track: SpotifyApi.TrackObjectFull | null;
}

const trackFullHelper = ({ track }: ItrackFullHelper) => {
  const newTrack = {
    image:
      track?.album.images[0].url ||
      'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: track?.name || 'Unknown',
    album: track?.album?.name || 'Unknown',
    artists:
      track && track?.artists.length > 0
        ? track?.artists
            .map(function (item) {
              return item['name'];
            })
            .join(', ')
        : 'Unknown',
    duration: track?.duration_ms ? msToMinutesAndSeconds(track?.duration_ms) : '0:00',
    id: track?.id,
    type: track?.type || 'Unknown',
    uri: track?.uri || '',
  };

  return newTrack;
};

export default trackFullHelper;
