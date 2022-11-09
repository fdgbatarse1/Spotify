import msToMinutesAndSeconds from './msToMinutesAndSeconds';

interface ItrackHelper {
  track: SpotifyApi.TrackObjectSimplified | undefined;
}

const trackHelper = ({ track }: ItrackHelper) => {
  const newTrack = {
    name: track?.name || 'Unknown',
    artists:
      track && track?.artists.length > 0
        ? track.artists
            .map(function (item) {
              return item['name'];
            })
            .join(', ')
        : 'Unknown',
    duration: track?.duration_ms ? msToMinutesAndSeconds(track?.duration_ms) : '0:00',
    id: track?.id,
  };
  return newTrack;
};

export default trackHelper;
