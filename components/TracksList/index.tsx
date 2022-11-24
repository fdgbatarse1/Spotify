import trackFullHelper from "@/lib/trackFullHelper";
import { useEffect, useState } from "react";
import TrackItem from "../TrackItem";

interface ITrackList {
  tracks: SpotifyApi.TrackObjectFull[] | null | undefined;
  playlist?: string | undefined;
}

const TracksList = ({ tracks, playlist }: ITrackList) => {
  const [uris, setUris] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (!playlist) {
      const tracksUris = tracks?.map((track) => track.uri);
      setUris(tracksUris);
    }
  }, [tracks, playlist]);

  return (
    <table className="table-auto">
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
                uris={uris}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default TracksList;
