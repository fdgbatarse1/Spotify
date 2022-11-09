import { BiPlay } from '@react-icons/all-files/bi/BiPlay';
import { BiStop } from '@react-icons/all-files/bi/BiStop';
import debounce from 'lodash/debounce';

import useSpotify from '@/hooks/useSpotify';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';

import { setCurrentTrack, setIsPlaying } from '@/store/features/tracks/tracksSlice';

const Play = () => {
  const dispatch = useAppDispatch();
  const spotifyApi = useSpotify();

  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const track = useAppSelector((state) => state.tracks.track);

  const handler = () => {
    if (track) {
      if (currentTrack?.name !== track?.name) {
        dispatch(setCurrentTrack(track));
        dispatch(setIsPlaying(true));
        spotifyApi.play({
          uris: [track.uri],
        });
      } else {
        if (!isPlaying) {
          dispatch(setIsPlaying(true));
        } else {
          dispatch(setIsPlaying(false));
        }
      }
    }
  };

  return (
    <>
      {currentTrack?.name !== track?.name || !isPlaying ? (
        <BiPlay
          onClick={debounce(handler, 300)}
          className='text-gray-900 text-2xl sm:text-3xl xl:text-4xl'
        />
      ) : (
        <BiStop
          onClick={debounce(handler, 300)}
          className='text-gray-900 text-2xl sm:text-3xl xl:text-4xl'
        />
      )}
    </>
  );
};

export default Play;
