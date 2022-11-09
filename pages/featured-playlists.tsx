import Card from '@/components/Card';
import ErrorC from '@/components/Error';
import Pagination from '@/components/Pagination';
import LoadingSection from '@/components/LoadingSection';
import Header from '@/components/Header';

import useGetFeaturedPlaylists from '@/hooks/useGetFeaturedPlaylists';

import playlistHelper from '@/lib/playlistHelper';
import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';

const FeaturedPlaylists = () => {
  useGetFeaturedPlaylists(true);

  const featuredPlaylists = useAppSelector((state) => state.playlists.featuredPlaylists);
  const featuredPlaylistsStatus = useAppSelector(
    (state) => state.playlists.featuredPlaylistsStatus,
  );
  const featuredPlaylistsError = useAppSelector((state) => state.playlists.featuredPlaylistsError);

  return (
    <>
      {featuredPlaylistsStatus === Status.PENDING && <LoadingSection />}
      {featuredPlaylistsStatus === Status.REJECTED && (
        <ErrorC error={featuredPlaylistsError}>
          <Header goBack={true} />
        </ErrorC>
      )}
      {featuredPlaylistsStatus === Status.FULFILLED && featuredPlaylists && (
        <div className='flex flex-col gap-6'>
          <Header goBack={true} />
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
              {featuredPlaylists.items.map((newRelease) => {
                const playlist = playlistHelper({ playlist: newRelease });
                return (
                  <Card
                    image={playlist.image}
                    title={playlist.name}
                    content={playlist.description}
                    minWidth={false}
                    href={`playlist/${playlist.id}`}
                    key={playlist.id}
                  />
                );
              })}
            </div>
          </div>
          {featuredPlaylists.limit < featuredPlaylists.total && (
            <Pagination path='/featured-playlists' total={featuredPlaylists.total} />
          )}
        </div>
      )}
    </>
  );
};

export default FeaturedPlaylists;
