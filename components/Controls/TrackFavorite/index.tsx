import { useEffect, useState } from 'react';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';

import Modal from '@/components/Modal';

import useSpotify from '@/hooks/useSpotify';
import debounce from 'lodash/debounce';

const TrackFavorite = ({ id }: { id: string | undefined }) => {
  const spotifyApi = useSpotify();

  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getMySavedTracksAsync = async () => {
      if (spotifyApi.getAccessToken() && typeof id === 'string') {
        const data = await spotifyApi.containsMySavedTracks([id]);

        const isTrackSaved = data.body[0];

        if (!isTrackSaved) {
          setSaved(false);
          return;
        }

        setSaved(true);
      }
    };

    getMySavedTracksAsync();
  }, [id, spotifyApi]);

  const handler = () => {
    if (id) {
      if (saved) {
        setShowModal(true);
      } else {
        spotifyApi.addToMySavedTracks([id]);
        setSaved(true);
      }
    }
  };

  const confirmationHandler = (confirmed: boolean) => {
    if (confirmed && id) {
      spotifyApi.removeFromMySavedTracks([id]);
      setSaved(false);
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className='flex flex-col gap-6 font-inter text-sm sm:text-base md:text-lg text-center font-medium'>
          <p>Do you want to delete this track from your library?</p>
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
      {saved ? (
        <AiFillHeart
          color='#22c55e'
          className='text-base md:text-lg lg:text-2xl min-w-32px'
          onClick={debounce(handler, 300)}
        />
      ) : (
        <AiOutlineHeart
          className='text-base md:text-lg lg:text-2xl min-w-32px'
          onClick={debounce(handler, 300)}
        />
      )}
    </>
  );
};

export default TrackFavorite;
