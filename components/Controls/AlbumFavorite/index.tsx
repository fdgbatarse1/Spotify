import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';

import Modal from '@/components/Modal';

import useSpotify from '@/hooks/useSpotify';

import { ICustomSession } from '@/types/common';
import { debounce } from 'lodash';

const AlbumFavorite = ({ id }: { id: string | undefined }) => {
  const { data: session }: ICustomSession = useSession();

  const spotifyApi = useSpotify();

  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getMySavedAlbumsAsync = async () => {
      try {
        if (spotifyApi.getAccessToken() && typeof id === 'string') {
          const data = await spotifyApi.containsMySavedAlbums([id]);

          const isAlbumSaved = data.body[0];

          if (!isAlbumSaved) {
            setSaved(false);
            return;
          }

          setSaved(true);
        }
      } catch {
        setSaved(true);
      }
    };

    getMySavedAlbumsAsync();
  }, [id, session?.user?.accessToken, spotifyApi]);

  const handler = () => {
    if (id) {
      if (saved) {
        setShowModal(true);
      } else {
        spotifyApi.addToMySavedAlbums([id]);
        setSaved(true);
      }
    }
  };

  const confirmationHandler = (confirmed: boolean) => {
    if (confirmed && id) {
      spotifyApi.removeFromMySavedAlbums([id]);
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
          <p>Do you want to delete this album from your library?</p>
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
        <AiOutlineHeart className='text-base md:text-lg lg:text-2xl min-w-32px' onClick={handler} />
      )}
    </>
  );
};

export default AlbumFavorite;
