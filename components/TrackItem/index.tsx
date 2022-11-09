import { useAppSelector } from '@/lib/reduxHooks';
import singlePlaylistResponseHelper from '@/lib/singlePlaylistResponseHelper';
import { ICustomSession } from '@/types/common';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import RemoveFromPlaylist from '../Controls/RemoveFromPlaylist';

interface ITrackItem {
  href: string;
  image: string;
  name: string;
  artists: string;
  album: string;
  duration: string;
  playlist?: string | undefined;
  track: SpotifyApi.TrackObjectFull;
}

const TrackItem = ({
  href,
  image,
  name,
  artists,
  album,
  duration,
  playlist,
  track,
}: ITrackItem) => {
  const { data: session }: ICustomSession = useSession();

  const currenPlaylist = useAppSelector((state) => state.playlists.playlist);

  const newPlaylist = singlePlaylistResponseHelper(currenPlaylist);

  return (
    <>
      {!playlist ? (
        <Link href={href} passHref>
          <tr className='font-inter cursor-pointer'>
            <td>
              <div className='flex items-center gap-4 p-2'>
                <Image src={image} alt={album} width='50' height='50' />
                <div className='whitespace-nowrap max-w-140px lg:max-w-none p-2'>
                  <h5 className='text-ellipsis overflow-hidden'>{name}</h5>
                  <h6 className='text-ellipsis overflow-hidden'>{artists}</h6>
                </div>
              </div>
            </td>
            <td>
              <p className='hidden 2xl:block'>{album}</p>
            </td>
            <td>
              <p className={`hidden lg:block`}>{duration}</p>
            </td>
          </tr>
        </Link>
      ) : (
        <>
          <tr className='font-inter cursor-pointer'>
            <td>
              <Link href={href} passHref>
                <div className='flex items-center gap-4 p-2'>
                  <Image src={image} alt={album} width='50' height='50' />
                  <div className='whitespace-nowrap max-w-120px lg:max-w-none p-2'>
                    <h5 className='text-ellipsis overflow-hidden'>{name}</h5>
                    <h6 className='text-ellipsis overflow-hidden'>{artists}</h6>
                  </div>
                </div>
              </Link>
            </td>
            <td>
              <Link href={href} passHref>
                <p className='hidden 2xl:block'>{album}</p>
              </Link>
            </td>
            <td>
              <div className={'inline'}>
                {newPlaylist.owner === session?.user?.username ? (
                  <RemoveFromPlaylist playlistId={playlist} track={track} />
                ) : (
                  <p className={`hidden lg:inline`}>{duration}</p>
                )}
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default TrackItem;
