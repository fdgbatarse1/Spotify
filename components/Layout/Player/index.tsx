import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";

import useSpotify from "@/hooks/useSpotify";

import { useAppSelector } from "@/lib/reduxHooks";

import {
  setCurrentTrack,
  setIsPlaying,
  setIsSaved,
} from "@/store/features/tracks/tracksSlice";
import { useSession } from "next-auth/react";
import { ICustomSession } from "@/types/common";

import SaveTrackforCurrentUser from "../../../services/SaveTrackForCurrentUser";

interface IPlayer {
  accesstoken: string | undefined;
  trackUri: string | undefined;
}

const Player = ({ accesstoken, trackUri }: IPlayer) => {
  const { data: session }: ICustomSession = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState<string>(
    "spotify:track:2JPLbjOn0wPCngEot2STUS"
  );
  const [firstTime, setFirstTime] = useState(true);
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();

  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const isSaved = useAppSelector((state) => state.tracks.isSaved);
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
    <div className="text-black bg-gray-50 dark:bg-gray-800 dark:text-white">
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
            dispatch(setIsSaved(true));
          } else {
            dispatch(setIsSaved(false));
          }
        }}
        play={isPlaying}
        styles={{
          bgColor: "xd",
          color: "xd",
          trackArtistColor: "xd",
          trackNameColor: "xd",
        }}
        updateSavedStatus={(updateSavedStatus) => updateSavedStatus(isSaved)}
        uris={trackUri ? [trackUri] : [recentlyPlayed]}
        showSaveIcon
        offset={firstTime ? undefined : -1}
      />
    </div>
  );
};

export default Player;
