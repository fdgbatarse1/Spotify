import { MdEdit } from '@react-icons/all-files/md/MdEdit';
import debounce from 'lodash/debounce';

import useSpotify from '@/hooks/useSpotify';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';

import { setPlaylist } from '@/store/features/playlists/playlistsSlice';

import validator from '@/lib/validator';

import { ChangeEvent, useState } from 'react';

import Modal from '@/components/Modal';
import useField from '@/hooks/useField';
import { useDispatch } from 'react-redux';

const EditPlaylist = () => {
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();

  const playlist = useAppSelector((state) => state.playlists.playlist);

  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name] = useField(
    {
      placeholder: '',
      name: 'name',
      type: 'text',
      autoComplete: 'off',
      inputMode: 'text',
    },
    playlist?.name,
  );

  const [description] = useField(
    {
      placeholder: '',
      name: 'description',
      type: 'text',
      autoComplete: 'off',
      inputMode: 'text',
    },
    playlist?.description,
  );

  const [privacy, setPrivacy] = useState(() => {
    if (playlist?.public) {
      return 'public';
    }
    return 'private';
  });

  const handler = () => {
    setShowModal(true);
    name.setValue(playlist?.name || '');
    description.setValue(playlist?.description || '');
  };

  const confirmationHandler = (confirmed: boolean) => {
    if (confirmed && playlist?.id) {
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
      spotifyApi.changePlaylistDetails(playlist?.id, {
        name: name.input.value,
        description: description.input.value,
        public: privacy === 'public' ? true : false,
      });
      const obj: SpotifyApi.SinglePlaylistResponse = {
        ...playlist,
        name: name.input.value,
        description: description.input.value,
        public: privacy === 'public' ? true : false,
      };
      dispatch(setPlaylist(obj));
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
    if (playlist?.public) {
      return 'public';
    }
    return 'private';
  };

  return (
    <div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        {success ? (
          <div>Playlist updated</div>
        ) : (
          <form
            className='flex flex-col gap-6 font-inter text-sm sm:text-base md:text-lg text-left font-medium'
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className='text-center'>Edit playlist</h2>
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
      <MdEdit
        className='text-base md:text-lg lg:text-2xl min-w-32px cursor-pointer'
        onClick={debounce(handler, 300)}
      />
    </div>
  );
};

export default EditPlaylist;
