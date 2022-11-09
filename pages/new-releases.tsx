import Card from '@/components/Card';
import ErrorC from '@/components/Error';
import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import LoadingSection from '@/components/LoadingSection';

import albumHelper from '@/lib/albumHelper';
import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';

import useGetNewReleases from '@/hooks/useGetNewReleases';

const NewReleases = () => {
  useGetNewReleases(true);

  const newReleases = useAppSelector((state) => state.albums.newReleases);
  const newReleasesStatus = useAppSelector((state) => state.albums.newReleasesStatus);
  const newReleasesError = useAppSelector((state) => state.albums.newReleasesError);

  return (
    <>
      {newReleasesStatus === Status.PENDING && <LoadingSection />}
      {newReleasesStatus === Status.REJECTED && (
        <ErrorC error={newReleasesError}>
          <Header goBack={true} />
        </ErrorC>
      )}
      {newReleasesStatus === Status.FULFILLED && newReleases && (
        <div className='flex flex-col gap-6'>
          <Header goBack={true} />
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
              {newReleases.items.map((newRelease) => {
                const album = albumHelper({ album: newRelease });
                return (
                  <Card
                    image={album.image}
                    title={album.name}
                    content={album.artists}
                    minWidth={false}
                    href={`/album/${album.id}`}
                    key={album.id}
                  />
                );
              })}
            </div>
          </div>
          <Pagination path='/new-releases' total={newReleases.total} />
        </div>
      )}
    </>
  );
};

export default NewReleases;
