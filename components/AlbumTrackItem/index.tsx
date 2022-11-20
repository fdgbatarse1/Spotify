import Link from 'next/link';

interface ITrackItem {
  href: string;
  name: string;
  artists: string;
  duration: string;
}

const AlbumTrackItem = ({ href, name, artists, duration }: ITrackItem) => {
  return (
    <Link href={href} passHref>
      <tr className='font-inter cursor-pointer hover:bg-gray-600'>
        <td>
          <div className='whitespace-nowrap max-w-260px md:max-w-260px lg:max-w-none p-2'>
            <h5 className='text-ellipsis overflow-hidden'>{name}</h5>
            <h6 className='text-ellipsis overflow-hidden'>{artists}</h6>
          </div>
        </td>
        <td>
          <p className='hidden sm:block text-right p-2'>{duration}</p>
        </td>
      </tr>
    </Link>
  );
};

export default AlbumTrackItem;
