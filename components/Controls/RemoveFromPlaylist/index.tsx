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

  const playlistTracks = useAppSelector(
    (state) => state.playlists.playlistTracks
  );

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
        })
      );
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Modal
        onClose={() => setShowModal(false)}
        withoutbackground
        show={showModal}
      >
        <div className="flex flex-col gap-6 font-inter text-sm rounded-xl sm:text-base md:text-lg text-center dark:bg-spotify-200 text-white p-8 font-medium">
          <p>Do you want to delete this track from this playlist?</p>
          <div className="flex justify-around items-center">
            <button
              className="text-white text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:text-white pointer"
              onClick={() => confirmationHandler(true)}
            >
              Yes
            </button>
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 pointer"
              onClick={() => confirmationHandler(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
      <MdDelete
        className="text-base md:text-lg lg:text-2xl min-w-32px cursor-pointer"
        onClick={debounce(handler, 300)}
      />
    </div>
  );
};

export default RemoveFromPlaylist;
