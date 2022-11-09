import Link from 'next/link';
import { FaSpotify } from '@react-icons/all-files/fa/FaSpotify';
import { AiFillHome } from '@react-icons/all-files/ai/AiFillHome';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { HiOutlineViewGrid } from '@react-icons/all-files/hi/HiOutlineViewGrid';

import { Routes, Navigation } from '@/lib/enums';

import Button from './Button';

const Sidebar = () => {
  return (
    <nav className='row-start-3 md:row-start-1 md:flex flex-col gap-6 pt-2 md:p-6 bg-gray-200 border-t md:border-r border-gray-300'>
      <div className='hidden md:flex justify-start items-center gap-4'>
        <FaSpotify className='text-5xl text-green-500 select-none' />
        <p className='text-green-500 font-bold text-3xl select-none'>Spotify</p>
      </div>
      <ul className='flex justify-around md:flex-col'>
        <li>
          <Link href={Routes.HOME} passHref>
            <Button text={Navigation.HOME}>
              <AiFillHome className='text-2xl' />
            </Button>
          </Link>
        </li>
        <li>
          <Link href={Routes.SEARCH} passHref>
            <Button text={Navigation.SEARCH}>
              <AiOutlineSearch className='text-2xl' />
            </Button>
          </Link>
        </li>
        <li>
          <Link href={Routes.YOUR_LIBRARY} passHref>
            <Button text={Navigation.YOUR_LIBRARY}>
              <HiOutlineViewGrid className='text-2xl' />
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
