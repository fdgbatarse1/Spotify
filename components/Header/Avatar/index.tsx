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
    <div className="relative">
      <div
        className="flex items-center gap-2 py-1.5 px-2 sm:pl-3 sm:pr-4 rounded-full  cursor-pointer font-inter bg-gradient-to-r from-spotify-100 via-spotify-200 to-spotify-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-spotify-100 dark:focus:ring-lime-800 shadow-lg shadow-spotify-300/50 dark:shadow-lg dark:shadow-lime-800/80 font-normal text-base text-center mr-2 mb-2"
        onClick={onClickAvatar}
      >
        <Image
          src={avatar.src}
          alt={avatar.alt}
          width={28}
          height={28}
          className="rounded-full fill-white "
        />
        <p className="text-gray-200 font-normal text-base text-center font-inter">
          {avatar.name}
        </p>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-gray-200" />
        ) : (
          <MdKeyboardArrowDown className="text-gray-200" />
        )}
      </div>
      {isOpen && (
        <div className="absolute text-center top-10 right-0 z-10 w-32 m-2 md:w-48 bg-gradient-to-l from-spotify-100 via-spotify-200 to-spotify-300 rounded-xl font-inter  text-sm text-gray-200">
          <Link href={Routes.PROFILE}>
            <a className="w-full block  py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 hover:rounded-xl  dark:hover:text-white">
              {Navigation.PROFILE}
            </a>
          </Link>
          <button
            onClick={onClickLogOut}
            className="w-full block  py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 hover:rounded-xl dark:hover:text-white"
          >
            {Navigation.LOG_OUT}
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
