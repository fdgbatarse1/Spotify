import Image from 'next/image';

import Header from '@/components/Header';
import Play from '@/components/Controls/Play';
import TrackFavorite from '@/components/Controls/TrackFavorite';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetTrack from '@/hooks/useGetTrack';

import trackFullHelper from '@/lib/trackFullHelper';
import { useAppSelector } from '@/lib/reduxHooks';
import AddToPlaylist from '@/components/Controls/AddToPlaylist';

const Track = () => {
  useGetTrack();

  const track = useAppSelector((state) => state.tracks.track);
  const trackError = useAppSelector((state) => state.tracks.trackError);
  const trackStatus = useAppSelector((state) => state.tracks.trackStatus);

  const trackFull = trackFullHelper({ track });

  const unsuccess = useCheckStatus(trackStatus, trackError, <Header goBack={true} />);

  if (unsuccess) {
    return unsuccess;
  }

  return (
    <div className='flex flex-col w-full h-full gap-6'>
      <Header goBack={true} />
      <section className='flex flex-col justify-center items-center gap-6 w-full h-full font-inter'>
        <div className={`relative aspect-square w-60 sm:w-72 2xl:w-80`}>
          <Image src={trackFull.image} alt={trackFull.name} layout='fill' className='rounded' />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <AddToPlaylist id={trackFull.uri} />
          <h2 className='text-xl md:text-2xl lg:text-4xl font-bold'>{trackFull.name}</h2>
          <TrackFavorite id={trackFull.id} />
        </div>
        <h3>{trackFull.album}</h3>
        <div className='flex gap-4'>
          <Play />
        </div>
        <div className='flex gap-4'>
          <h4>{trackFull.artists}</h4>
          <p>{trackFull.duration}</p>
        </div>
      </section>
    </div>
  );
};

export default Track;
