import Link from 'next/link';
import { FaSpotify } from '@react-icons/all-files/fa/FaSpotify';
import { AiFillHome } from '@react-icons/all-files/ai/AiFillHome';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { HiOutlineViewGrid } from '@react-icons/all-files/hi/HiOutlineViewGrid';
import { Routes, Navigation } from '@/lib/enums';
import Button from './Button';
import { useAppSelector } from '@/lib/reduxHooks';
import ErrorMessage from '@/components/Error/Message';
import { Status } from '@/lib/enums';
import useGetMyPlaylists from '@/hooks/useGetMyPlaylists';
import playlistHelper from '@/lib/playlistHelper';

interface IMyPlaylistsPrev {
  title: string;
  href?: string;
}
const Sidebar = ({ title, href }: IMyPlaylistsPrev) => {
  useGetMyPlaylists(false);
  const playlists = useAppSelector((state) => state.playlists.playlists);
  const playlistsStatus = useAppSelector(
    (state) => state.playlists.playlistsStatus
  );
  const playlistsError = useAppSelector(
    (state) => state.playlists.playlistsError
  );

  return (
    <nav className="row-start-3 md:row-start-1 md:flex flex-col gap-6 pt-2 md:p-6 bg-gray-200 border-t md:border-r border-gray-300">
      <div className="hidden md:flex justify-start items-center gap-4">
        <FaSpotify className="text-5xl text-green-500 select-none" />
        <p className="text-green-500 font-bold text-3xl select-none">Spotify</p>
      </div>
      <ul className="flex justify-around md:flex-col">
        <li>
          <Link href={Routes.HOME} passHref>
            <Button text={Navigation.HOME}>
              <AiFillHome className="text-2xl" />
            </Button>
          </Link>
        </li>
        <li>
          <Link href={Routes.SEARCH} passHref>
            <Button text={Navigation.SEARCH}>
              <AiOutlineSearch className="text-2xl" />
            </Button>
          </Link>
        </li>
        <li>
          <Link href={Routes.YOUR_LIBRARY} passHref>
            <Button text={Navigation.YOUR_LIBRARY}>
              <HiOutlineViewGrid className="text-2xl" />
            </Button>
          </Link>
        </li>
      </ul>
      {/*Playlists*/}
      <div className="overflow-y-scroll scrollbar-hide">
        {playlistsStatus === Status.REJECTED && (
          <ErrorMessage error={playlistsError} />
        )}
        {playlistsStatus === Status.FULFILLED &&
          playlists &&
          playlists.items.map((playlist) => {
            const newPlaylist = playlistHelper({ playlist });
            return (
              <Link
                key={newPlaylist.id}
                passHref
                href={`/playlist/${newPlaylist.id}`}
              >
                <span className="hidden md:flex md:cursor-pointer md:text-base md:font-inter md:text-gray-500 md:hover:text-green-500 md:py-2 md:px-2 md:text-justify">
                  {newPlaylist.name}
                </span>
              </Link>
            );
          })}
      </div>
    </nav>
  );
};

export default Sidebar;
