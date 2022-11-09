import Image from 'next/image';

import AlbumFavorite from '@/components/Controls/AlbumFavorite';

import albumFullHelper from '@/lib/albumFullHelper';
import { useAppSelector } from '@/lib/reduxHooks';

const AlbumDescription = () => {
  const album = useAppSelector((state) => state.albums.album);

  const albumFull = albumFullHelper({ album });

  return (
    <header className='flex flex-col 2xl:flex-row items-center 2xl:items-end gap-6 font-inter'>
      <div className={`relative aspect-square w-200px sm:w-200px 2xl:w-300px`}>
        <Image src={albumFull.image} alt={albumFull.name} layout='fill' className='rounded' />
      </div>
      <div className='flex flex-col gap-2 2xl:gap-6'>
        <div className='flex justify-center items-center 2xl:justify-start gap-2 w-full'>
          <h2 className='font-bold text-sm 2xl:text-base text-center 2xl:text-left uppercase'>
            {albumFull.albumType}
          </h2>
          <AlbumFavorite id={albumFull.id} />
        </div>
        <h1 className='font-bold text-4xl 2xl:text-6xl text-center 2xl:text-left'>
          {albumFull.name}
        </h1>
        <div className='flex flex-col 2xl:flex-row items-center 2xl:items-center gap-4 2xl:gap-6 font-medium'>
          <div className='flex items-center gap-2 2xl:gap-6 text-center 2xl:text-left'>
            <p>{albumFull.artists}</p>
          </div>
          <div className='flex items-center gap-6 2xl:gap-6 2xl:text-sm'>
            {albumFull.artists && albumFull.date && (
              <span className='hidden 2xl:block font-bold text-lg 2xl:text-xl'> &bull;</span>
            )}
            <p>{albumFull.date}</p>
            {albumFull.date && albumFull.tracks && (
              <span className='block text-base font-bold sm:text-lg 2xl:text-xl'> &bull;</span>
            )}
            <p>
              {albumFull.tracks}
              {albumFull.tracks === 1 ? ' track' : ' tracks'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AlbumDescription;
