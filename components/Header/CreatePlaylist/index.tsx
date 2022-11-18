import { ChangeEvent, useState } from 'react';
import { BsPlus } from '@react-icons/all-files/bs/BsPlus';

import Modal from '@/components/Modal';

import useSpotify from '@/hooks/useSpotify';
import useField from '@/hooks/useField';

import validator from '@/lib/validator';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

const CreatePlaylist = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name] = useField({
    placeholder: '',
    name: 'name',
    type: 'text',
    autoComplete: 'off',
    inputMode: 'text',
  });

  const [description] = useField({
    placeholder: '',
    name: 'description',
    type: 'text',
    autoComplete: 'off',
    inputMode: 'text',
  });

  const [privacy, setPrivacy] = useState('private');

  const handler = () => {
    setShowModal(true);
    name.setValue('');
    description.setValue('');
    setPrivacy('private');
  };

  const confirmationHandler = (confirmed: boolean) => {
    if (confirmed) {
      const nameError = validator(name.input.value, true);
      const descriptionError = validator(description.input.value, false);
      if (nameError || descriptionError) {
        name.setError(nameError);
        description.setError(descriptionError);
        return;
      }
      if (privacy !== 'public' && privacy !== 'private') {
        name.setError(nameError);
        description.setError(descriptionError);
        return;
      }
      spotifyApi.createPlaylist(name.input.value, {
        description: description.input.value,
        public: privacy === 'public' ? true : false,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        cleanUp();
        setShowModal(false);
      }, 2000);
    } else {
      cleanUp();
      setShowModal(false);
    }
  };

  const onPrivacyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivacy(e.target.value);
  };

  const cleanUp = () => {
    name.setError('');
    description.setError('');
    setPrivacy('private');
  };

  return (
    <div>
      <Modal
        onClose={() => setShowModal(false)}
        withoutbackground
        show={showModal}
      >
        {success ? (
          <div className="relative text rounded text-xl dark:bg-spotify-200 p-4  text-white">
            Playlist created
          </div>
        ) : (
          <div className="relative sm:p-0 max-w-260px sm:max-w-xs lg:max-w-none  w-96 rounded-lg shadow dark:bg-spotify-200">
            <button
              onClick={() => confirmationHandler(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-100 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h2 className="text-center drop-shadow-xl mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Add Playlist
              </h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Name
                    <input
                      {...name.input}
                      className="bg-gray-40 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white my-2"
                    />
                  </label>
                  {name.error && (
                    <p className="text-base font-semibold text-red-500 drop-shadow-lg w-full">
                      {name.error}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Description
                    <input
                      {...description.input}
                      className="bg-gray-40 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white my-2"
                    ></input>
                  </label>
                  {description.error && (
                    <p className="text-base font-semibold text-red-500 drop-shadow-lg w-full">
                      {description.error}
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        value="public"
                        checked={privacy === 'public'}
                        onChange={onPrivacyChange}
                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <label className="ml-2 text-base font-medium text-gray-900 dark:text-white">
                      Public
                    </label>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        value="private"
                        checked={privacy === 'private'}
                        onChange={onPrivacyChange}
                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <label className="ml-2 text-base font-medium text-gray-900 dark:text-white">
                      Private
                    </label>
                  </div>
                </div>
                <div className="wfull text-center items-center">
                  <button
                    onClick={() => confirmationHandler(true)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                  >
                    <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
                      Create
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>
      <div
        className="flex py-2 px-2 sm:pl-3 sm:pr-4 rounded-full  cursor-pointer font-inter text-gray-200 bg-gradient-to-r from-spotify-100 via-spotify-200 to-spotify-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-spotify-100 dark:focus:ring-lime-800 shadow-lg shadow-spotify-300/50 dark:shadow-lg dark:shadow-lime-800/80 font-normal text-base text-center mr-2 mb-2"
        onClick={debounce(handler, 300)}
      >
        <BsPlus className="text-gray-200 text-2xl" />{' '}
        <span className="hidden sm:block ">Playlist</span>
      </div>
    </div>
  );
};

export default CreatePlaylist;
function dispatch(arg0: { payload: boolean; type: string }) {
  throw new Error('Function not implemented.');
}
