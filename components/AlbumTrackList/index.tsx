import albumTrackHelper from "@/lib/albumTrackHelper";
import AlbumTrackItem from "../AlbumTrackItem";

interface ITrackList {
  tracks: SpotifyApi.TrackObjectSimplified[] | undefined;
  album: SpotifyApi.AlbumObjectFull | null;
}

const AlbumTracksList = ({ album, tracks }: ITrackList) => {
  return (
    <table className="table-auto">
      <tbody>
        {tracks &&
          tracks.map((track) => {
            const newTrack = albumTrackHelper({ track });
            return (
              <AlbumTrackItem
                trackSimplified={track}
                track={newTrack}
                name={newTrack.name}
                artists={newTrack.artists}
                duration={newTrack.duration}
                album={album}
                key={newTrack.id}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default AlbumTracksList;
