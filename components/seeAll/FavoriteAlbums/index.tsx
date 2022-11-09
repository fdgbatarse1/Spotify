import Card from '@/components/Card';
import Pagination from '@/components/Pagination';

import albumHelper from '@/lib/albumHelper';

import { useAppSelector } from '@/lib/reduxHooks';

interface ISeeAllFavoriteAlbums {
  path: string;
}

const SeeAllFavoriteAlbums = ({ path }: ISeeAllFavoriteAlbums) => {
  const favoriteAlbums = useAppSelector((state) => state.favorites.favoriteAlbums);

  if (!favoriteAlbums) return null;

  return (
    <div className='flex flex-col gap-6 pb-6'>
      <div className='w-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
          {favoriteAlbums.items.map((favoriteAlbum) => {
            const album = favoriteAlbum.album;
            const newAlbum = albumHelper({ album });
            return (
              <Card
                image={newAlbum.image}
                title={newAlbum.name}
                content={newAlbum.artists}
                minWidth={false}
                href={`/album/${newAlbum.id}`}
                key={newAlbum.id}
              />
            );
          })}
        </div>
      </div>
      <Pagination path={path} total={favoriteAlbums.total} />
    </div>
  );
};

export default SeeAllFavoriteAlbums;
