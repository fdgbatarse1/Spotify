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
      <Modal
        onClose={() => setShowModal(false)}
        withoutbackground
        show={showModal}
      >
        <div className="flex flex-col gap-6 font-inter text-sm rounded-xl sm:text-base md:text-lg text-center dark:bg-spotify-200 text-white p-8 font-medium">
          <p>Do you want to unfollow this playlist?</p>
          <div className="flex justify-around items-center">
            <button
              className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:text-white pointer"
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

export default DeletePlaylist;
