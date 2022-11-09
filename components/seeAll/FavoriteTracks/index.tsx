import Card from '@/components/Card';
import Pagination from '@/components/Pagination';

import trackHelper from '@/lib/trackFullHelper';
import { useAppSelector } from '@/lib/reduxHooks';

interface ISeeAllFavoriteTracks {
  path: string;
}

const SeeAllFavoriteTracks = ({ path }: ISeeAllFavoriteTracks) => {
  const favoriteTracks = useAppSelector((state) => state.favorites.favoriteTracks);

  if (!favoriteTracks) return null;

  return (
    <div className='flex flex-col gap-6 pb-6'>
      <div className='w-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
          {favoriteTracks.items.map((favoriteTrack) => {
            const track = favoriteTrack.track;
            const newTrack = trackHelper({ track });
            return (
              <Card
                image={newTrack.image}
                title={newTrack.name}
                minWidth={true}
                content={newTrack.type}
                href={`/track/${newTrack.id}`}
                key={newTrack.id}
              />
            );
          })}
        </div>
      </div>
      <Pagination path={path} total={favoriteTracks.total} />
    </div>
  );
};

export default SeeAllFavoriteTracks;
