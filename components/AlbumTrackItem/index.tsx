import Play from "../Controls/Play";

interface ITrackItem {
  name: string;
  artists: string;
  duration: string;
  album: SpotifyApi.AlbumObjectFull | null;
  track: {
    name: string;
    artists: string;
    duration: string;
    id: string | undefined;
  };
  trackSimplified: SpotifyApi.TrackObjectSimplified;
}

const AlbumTrackItem = ({
  trackSimplified,
  track,
  name,
  artists,
  duration,
  album,
}: ITrackItem) => {
  return (
    <div>
      <tr className="font-inter cursor-pointer hover:bg-gray-200 flex items-center justify-between">
        <td>
          <Play newTrack={trackSimplified} context_uri={album?.uri} />
        </td>
        <td className="mr-auto">
          <div className="whitespace-nowrap max-w-140px md:max-w-260px lg:max-w-none p-2">
            <h5 className="text-ellipsis overflow-hidden">{name}</h5>
            <h6 className="text-ellipsis overflow-hidden">{artists}</h6>
          </div>
        </td>
        <td>
          <p className="hidden sm:block text-right p-2">{duration}</p>
        </td>
      </tr>
    </div>
  );
};

export default AlbumTrackItem;
