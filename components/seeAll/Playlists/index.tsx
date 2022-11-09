import Card from '@/components/Card';
import Pagination from '@/components/Pagination';

import playlistHelper from '@/lib/playlistHelper';
import { useAppSelector } from '@/lib/reduxHooks';

interface ISeeAllPlaylists {
  path: string;
}

const SeeAllPlaylists = ({ path }: ISeeAllPlaylists) => {
  const playlist = useAppSelector((state) => state.playlists.playlists);

  if (!playlist) return null;

  return (
    <div className='flex flex-col gap-6 pb-6'>
      <div className='w-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
          {playlist.items.map((playlist) => {
            const newPlaylist = playlistHelper({ playlist });
            return (
              <Card
                image={newPlaylist.image}
                title={newPlaylist.name}
                content={newPlaylist.description}
                minWidth={true}
                href={`/playlist/${newPlaylist.id}`}
                key={newPlaylist.id}
              />
            );
          })}
        </div>
      </div>
      <Pagination path={path} total={playlist.total} />
    </div>
  );
};

export default SeeAllPlaylists;
