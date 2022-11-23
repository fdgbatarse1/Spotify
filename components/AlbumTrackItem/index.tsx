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
    <tr className="font-inter cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-between">
      <td>
        <Play newTrack={trackSimplified} context_uri={album?.uri} />
      </td>
      <td className="mr-auto">
        <span className="block whitespace-nowrap max-w-140px md:max-w-260px lg:max-w-none p-2">
          <h5 className="text-ellipsis overflow-hidden">{name}</h5>
          <h6 className="text-ellipsis overflow-hidden">{artists}</h6>
        </span>
      </td>
      <td>
        <p className="hidden sm:block text-right p-2">{duration}</p>
      </td>
    </tr>
  );
};

export default AlbumTrackItem;
