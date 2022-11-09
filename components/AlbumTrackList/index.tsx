import albumTrackHelper from '@/lib/albumTrackHelper';
import AlbumTrackItem from '../AlbumTrackItem';

interface ITrackList {
  tracks: SpotifyApi.TrackObjectSimplified[] | undefined;
}

const AlbumTracksList = ({ tracks }: ITrackList) => {
  return (
    <table className='table-auto'>
      <tbody>
        {tracks &&
          tracks.map((track) => {
            const newTrack = albumTrackHelper({ track });
            return (
              <AlbumTrackItem
                href={`/track/${newTrack.id}`}
                name={newTrack.name}
                artists={newTrack.artists}
                duration={newTrack.duration}
                key={newTrack.id}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default AlbumTracksList;
