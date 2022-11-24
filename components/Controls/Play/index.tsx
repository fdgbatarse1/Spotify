import { BiPlay } from "@react-icons/all-files/bi/BiPlay";
import { BiStop } from "@react-icons/all-files/bi/BiStop";
import debounce from "lodash/debounce";

import useSpotify from "@/hooks/useSpotify";

import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";

import {
  setCurrentTrack,
  setIsPlaying,
} from "@/store/features/tracks/tracksSlice";

interface IPlay {
  name?: string;
  newTrack?: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  context_uri?: string;
  uris?: string[];
}

const Play = ({ newTrack, context_uri, uris }: IPlay) => {
  const dispatch = useAppDispatch();
  const spotifyApi = useSpotify();

  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const track = useAppSelector((state) => state.tracks.track);

  const handler = () => {
    if (newTrack && uris) {
      if (currentTrack?.id !== newTrack.id) {
        dispatch(setCurrentTrack(newTrack));
        dispatch(setIsPlaying(true));
        spotifyApi.play({
          uris: uris,
          offset: {
            uri: newTrack.uri,
          },
        });
      } else {
        dispatch(setIsPlaying(!isPlaying));
      }
      return;
    }

    if (newTrack && context_uri) {
      if (currentTrack?.id !== newTrack.id) {
        dispatch(setCurrentTrack(newTrack));
        dispatch(setIsPlaying(true));
        spotifyApi.play({
          context_uri: context_uri,
          offset: {
            uri: newTrack.uri,
          },
        });
      } else {
        dispatch(setIsPlaying(!isPlaying));
      }
      return;
    }

    if (track) {
      if (currentTrack?.name !== track?.name) {
        dispatch(setCurrentTrack(track));
        dispatch(setIsPlaying(true));
        spotifyApi.play({
          uris: [track.uri],
        });
      } else {
        dispatch(setIsPlaying(!isPlaying));
      }
      return;
    }
  };

  if (newTrack) {
    if (currentTrack?.id === newTrack.id) {
      if (isPlaying) {
        return <BiStop className="text-2xl cursor-pointer" onClick={handler} />;
      }
    }
    return <BiPlay className="text-2xl cursor-pointer" onClick={handler} />;
  }

  return (
    <>
      {currentTrack?.name !== track?.name || !isPlaying ? (
        <BiPlay
          onClick={debounce(handler, 300)}
          className="text-gray-900 dark:text-white text-2xl sm:text-3xl xl:text-4xl"
        />
      ) : (
        <BiStop
          onClick={debounce(handler, 300)}
          className="text-gray-900 dark:text-white text-2xl sm:text-3xl xl:text-4xl"
        />
      )}
    </>
  );
};

export default Play;
