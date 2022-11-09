import albumTrackHelper from '@/lib/albumTrackHelper';
import trackFullHelper from '@/lib/trackFullHelper';
import TrackItem from '../TrackItem';

interface ITrackList {
  tracks: SpotifyApi.TrackObjectFull[] | null | undefined;
  playlist?: string | undefined;
}

const TracksList = ({ tracks, playlist }: ITrackList) => {
  return (
    <table className='table-auto'>
      <tbody>
        {tracks &&
          tracks.map((track) => {
            const newTrack = trackFullHelper({ track });
            return (
              <TrackItem
                playlist={playlist}
                href={`/track/${newTrack.id}`}
                name={newTrack.name}
                artists={newTrack.artists}
                duration={newTrack.duration}
                key={newTrack.id}
                image={newTrack.image}
                album={newTrack.album}
                track={track}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default TracksList;
