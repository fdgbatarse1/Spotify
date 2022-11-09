import Card from '@/components/Card';
import Pagination from '@/components/Pagination';

import useSearchAlbum from '@/hooks/useSearchAlbum';
import albumHelper from '@/lib/albumHelper';

import { useAppSelector } from '@/lib/reduxHooks';

interface ISeeAllAlbums {
  path: string;
}

const SeeAllAlbums = ({ path }: ISeeAllAlbums) => {
  useSearchAlbum(true);

  const albums = useAppSelector((state) => state.albums.albums);

  if (!albums) return null;

  return (
    <div className='flex flex-col gap-6 pb-6'>
      <div className='w-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
          {albums.items.map((album) => {
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
      <Pagination path={path} total={albums.total} />
    </div>
  );
};

export default SeeAllAlbums;
