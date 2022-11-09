import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import debounce from 'lodash/debounce';

import useSpotify from '@/hooks/useSpotify';

import { useState } from 'react';
import Modal from '@/components/Modal';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/enums';

const DeletePlaylist = ({ id }: { id: string | undefined }) => {
  const spotifyApi = useSpotify();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const handler = () => {
    setShowModal(true);
  };

  const confirmationHandler = (confirmed: boolean) => {
    if (confirmed && id) {
      spotifyApi.unfollowPlaylist(id);
      setShowModal(false);
      router.push(Routes.YOUR_LIBRARY);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className='flex flex-col gap-6 font-inter text-sm sm:text-base md:text-lg text-center font-medium'>
          <p>Do you want to unfollow this playlist?</p>
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

export default DeletePlaylist;
