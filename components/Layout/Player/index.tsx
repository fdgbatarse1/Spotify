import useSpotify from '@/hooks/useSpotify';
import { useAppSelector } from '@/lib/reduxHooks';
import { setIsPlaying } from '@/store/features/tracks/tracksSlice';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

interface IPlayer {
  accesstoken: string | undefined;
  trackUri: string | undefined;
}

const darkModeStyles = (isDark:boolean) => {

  console.log("Dark message",isDark);

    if(isDark)
    {return {

        activeColor: '#fff',
        bgColor: 'rgb(31 41 55)',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',

    }}

    return {
      bgColor: 'rgb(249 250 251 / var(--tw-bg-opacity))'
    }
}

const Player = ({ accesstoken, trackUri}: IPlayer) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState('spotify:track:2JPLbjOn0wPCngEot2STUS');
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const { systemTheme, theme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

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
          throw new Error('error');
        }
        const track = data.body.items[0].track.uri;
        setRecentlyPlayed(track);
      } catch {
        setRecentlyPlayed('spotify:track:2JPLbjOn0wPCngEot2STUS');
      }
    };

    getMyRecentlyPlayedTracksAsync();
  }, [spotifyApi]);

  if (!accesstoken) return null;

  return (
    <div>
      { currentTheme === "dark" ? <SpotifyPlayer
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
        }}
        styles={darkModeStyles(currentTheme==="dark")}
        play={isPlaying}
        uris={trackUri ? [trackUri] : [recentlyPlayed]}
      />:<SpotifyPlayer
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
      }}
      styles={darkModeStyles(currentTheme==="dark")}
      play={isPlaying}
      uris={trackUri ? [trackUri] : [recentlyPlayed]}
    />}
    </div>
  );
};

export default Player;
