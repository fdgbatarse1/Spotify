import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { MdKeyboardArrowDown } from '@react-icons/all-files/md/MdKeyboardArrowDown';
import { MdKeyboardArrowUp } from '@react-icons/all-files/md/MdKeyboardArrowUp';

import avatarHelper from '@/lib/avatarHelper';
import { Routes, Navigation } from '@/lib/enums';

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const avatar = avatarHelper({ session });

  const onClickAvatar = () => {
    setIsOpen((oldState) => !oldState);
  };

  const onClickLogOut = () => {
    setIsOpen(false);
    signOut({ callbackUrl: Routes.LOGIN });
  };

  return (
    <div className='relative'>
      <div
        className='flex items-center gap-2 p-0.5 pr-1.5 bg-gray-200 dark:bg-gray-300 rounded-full cursor-pointer select-none hover:opacity-70'
        onClick={onClickAvatar}
      >
        <Image src={avatar.src} alt={avatar.alt} width={28} height={28} className='rounded-full' />
        <p className='text-gray-900 dark:text-gray-900 text-sm font-inter'>{avatar.name}</p>
        {isOpen ? (
          <MdKeyboardArrowUp className='text-gray-900 dark:text-white' />
        ) : (
          <MdKeyboardArrowDown className='text-gray-900 dark:text-gray-900' />
        )}
      </div>
      {isOpen && (
        <div className='absolute top-10 right-0 z-10 w-32 md:w-48 bg-gray-200 dark:bg-gray-300 rounded font-inter text-left text-sm text-gray-900 dark:text-gray-900'>
          <Link href={Routes.PROFILE}>
            <a className='block w-full px-2 py-2 hover:opacity-70 dark:text-gray-900'>{Navigation.PROFILE}</a>
          </Link>
          <button
            onClick={onClickLogOut}
            className='block text-left w-full px-2 py-2 hover:opacity-70'
          >
            {Navigation.LOG_OUT}
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
