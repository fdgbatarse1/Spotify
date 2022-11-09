import { useAppSelector } from '@/lib/reduxHooks';

import TracksList from '../TracksList';

const AlbumList = () => {
  const tracks = useAppSelector((state) => state.artists.topTracks);

  return (
    <div className='flex flex-col gap-2'>
      <h4 className='text-2xl font-bold text-gray-900'>Top tracks</h4>
      <TracksList tracks={tracks} />
    </div>
  );
};

export default AlbumList;
