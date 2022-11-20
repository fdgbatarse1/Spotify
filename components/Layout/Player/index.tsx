import useSpotify from "@/hooks/useSpotify";
import { useAppSelector } from "@/lib/reduxHooks";
import {
  setCurrentTrack,
  setIsPlaying,
  setTrack,
} from "@/store/features/tracks/tracksSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";

interface IPlayer {
  accesstoken: string | undefined;
  trackUri: string | undefined;
}

const Player = ({ accesstoken, trackUri }: IPlayer) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(
    "spotify:track:2JPLbjOn0wPCngEot2STUS"
  );
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();

  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const initialVolume = 50;

  useEffect(() => {
    dispatch(setIsPlaying(true));
  }, [dispatch, trackUri]);

  useEffect(() => {
    const getMyRecentlyPlayedTracksAsync = async () => {
      try {
        const data = await spotifyApi.getMyRecentlyPlayedTracks();
        if (!data.body.items[0].track.uri) {
          throw new Error("error");
        }
        const track = data.body.items[0].track.uri;
        setRecentlyPlayed(track);
      } catch {
        setRecentlyPlayed("spotify:track:2JPLbjOn0wPCngEot2STUS");
      }
    };

    getMyRecentlyPlayedTracksAsync();
  }, [spotifyApi]);

  if (!accesstoken) return null;

  return (
    <SpotifyPlayer
      token={accesstoken}
      autoPlay
      persistDeviceSelection
      syncExternalDevice
      initialVolume={initialVolume}
      callback={(state) => {
        if (!state.isPlaying) {
          dispatch(setIsPlaying(false));
        } else {
          dispatch(setIsPlaying(true));
        }
        if (state.track.uri !== trackUri) {
          dispatch(setCurrentTrack(state.track));
        }
      }}
      styles={{
        bgColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
      }}
      play={isPlaying}
      uris={trackUri ? [trackUri] : [recentlyPlayed]}
      offset={1}
    />
  );
};

export default Player;
