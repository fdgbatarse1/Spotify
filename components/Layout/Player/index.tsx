import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";

import useSpotify from "@/hooks/useSpotify";

import { useAppSelector } from "@/lib/reduxHooks";

import {
  setCurrentTrack,
  setIsPlaying,
} from "@/store/features/tracks/tracksSlice";
import { useSession } from "next-auth/react";
import { ICustomSession } from "@/types/common";

import SaveTrackforCurrentUser from "../../../services/SaveTrackForCurrentUser";

interface IPlayer {
  accesstoken: string | undefined;
  trackUri: string | undefined;
}

const darkModeStyles = (isDark: boolean) => {
  if (isDark) {
    return {
      activeColor: "#fff",
      bgColor: "rgb(31 41 55)",
      color: "#fff",
      loaderColor: "#fff",
      sliderColor: "#1cb954",
      trackArtistColor: "#ccc",
      trackNameColor: "#fff",
    };
  }

  return {
    bgColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
  };
};

const Player = ({ accesstoken, trackUri }: IPlayer) => {
  const { data: session }: ICustomSession = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState<string>(
    "spotify:track:2JPLbjOn0wPCngEot2STUS"
  );
  const [firstTime, setFirstTime] = useState(true);
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const initialVolume = 50;

  useEffect(() => {
    dispatch(setIsPlaying(true));
  }, [dispatch, trackUri]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      const getMyRecentlyPlayedTracksAsync = async () => {
        const data = await spotifyApi.getMyRecentlyPlayedTracks();
        setRecentlyPlayed(data.body.items[0].track.uri);
      };

      getMyRecentlyPlayedTracksAsync();
    }
  }, [recentlyPlayed, session?.user?.accessToken, spotifyApi]);

  if (!accesstoken) return null;
  if (!recentlyPlayed) return null;
  if (!spotifyApi.getAccessToken()) return null;

  const save = (id: string) => {
    SaveTrackforCurrentUser({ id: id, token: accesstoken });
  };

  return (
    <div>
      {currentTheme === "dark" ? (
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
              setFirstTime(false);
            }
            if (state.track.uri !== trackUri) {
              dispatch(setCurrentTrack(state.track));
            }
            if (state.isSaved) {
              save(state.track.id);
            }
          }}
          styles={darkModeStyles(currentTheme === "dark")}
          play={isPlaying}
          uris={trackUri ? [trackUri] : [recentlyPlayed]}
          showSaveIcon
          offset={firstTime ? undefined : -1}
        />
      ) : (
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
              setFirstTime(false);
            }
            if (state.track.uri !== trackUri) {
              dispatch(setCurrentTrack(state.track));
            }
            if (state.isSaved) {
              save(state.track.id);
            }
          }}
          styles={darkModeStyles(currentTheme === "dark")}
          play={isPlaying}
          uris={trackUri ? [trackUri] : [recentlyPlayed]}
          showSaveIcon
          offset={firstTime ? undefined : -1}
        />
      )}
    </div>
  );
};

export default Player;
