import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import debounce from 'lodash/debounce';

import useSpotify from '@/hooks/useSpotify';

import { useState } from 'react';
import Modal from '@/components/Modal';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import { setPlaylistTracks } from '@/store/features/playlists/playlistsSlice';
import removeItem from '@/lib/removeItem';

interface IRemoveFromPlaylist {
  playlistId: string;
  track: SpotifyApi.TrackObjectFull;
}

const RemoveFromPlaylist = ({ playlistId, track }: IRemoveFromPlaylist) => {
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  const playlistTracks = useAppSelector((state) => state.playlists.playlistTracks);

  const [showModal, setShowModal] = useState(false);

  const handler = () => {
    setShowModal(true);
  };

  const confirmationHandler = (confirmed: boolean) => {
    if (confirmed && playlistTracks) {
      spotifyApi.removeTracksFromPlaylist(playlistId, [track]);

      let newTracks: SpotifyApi.PlaylistTrackObject[] = [];

      playlistTracks.items.map((item) => {
        if (item?.track) {
          if (item.track !== track) {
            newTracks.push(item);
          }
        }
      });

      dispatch(
        setPlaylistTracks({
          ...playlistTracks,
          items: newTracks,
        }),
      );
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className='flex flex-col gap-6 font-inter text-sm sm:text-base md:text-lg text-center font-medium'>
          <p>Do you want to delete this track from this playlist?</p>
          <div className='flex justify-around items-center'>
            <button
              className='hover:text-green-500 pointer'
              onClick={() => confirmationHandler(true)}
            >
              Yes
            </button>
            <button
              className='hover:text-green-500 pointer'
              onClick={() => confirmationHandler(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
      <MdDelete
        className='text-base md:text-lg lg:text-2xl min-w-32px cursor-pointer'
        onClick={debounce(handler, 300)}
      />
    </div>
  );
};

export default RemoveFromPlaylist;
