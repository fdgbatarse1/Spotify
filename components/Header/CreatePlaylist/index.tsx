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
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        {success ? (
          <div>Playlist created</div>
        ) : (
          <form
            className='flex flex-col gap-6 font-inter text-sm sm:text-base md:text-lg text-left font-medium'
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className='text-center'>Create playlist</h2>
            <div className='relative flex flex-col items-start'>
              <label htmlFor='name' className='flex gap-4 w-full'>
                Name
                <input {...name.input} className='flex-auto text-base w-full text-gray-400' />
              </label>
              {name.error && <p className='text-base text-red-500 w-full'>{name.error}</p>}
            </div>
            <div className='relative flex flex-col items-start'>
              <label htmlFor='name' className='flex gap-4 w-full'>
                Description
                <input
                  {...description.input}
                  className='flex-auto text-base w-full text-gray-400'
                />
              </label>
              {description.error && (
                <p className='text-base text-red-500 w-full'>{description.error}</p>
              )}
            </div>
            <div className='flex flex-col justify-around w-full'>
              <label>
                <input
                  type='radio'
                  value='public'
                  checked={privacy === 'public'}
                  onChange={onPrivacyChange}
                />
                Public
              </label>
              <label>
                <input
                  type='radio'
                  value='private'
                  checked={privacy === 'private'}
                  onChange={onPrivacyChange}
                />
                Private
              </label>
            </div>
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
          </form>
        )}
      </Modal>
      <div
        className='flex py-1 px-1 sm:pl-3 sm:pr-4 bg-gray-200 rounded-full hover:opacity-70 cursor-pointer font-inter text-gray-500'
        onClick={debounce(handler, 300)}
      >
        <BsPlus className='text-gray-500 text-2xl' />{' '}
        <span className='hidden sm:block '>Playlist</span>
      </div>
    </div>
  );
};

export default CreatePlaylist;
function dispatch(arg0: { payload: boolean; type: string }) {
  throw new Error('Function not implemented.');
}
