import Card from '@/components/Card';
import Header from '@/components/Header';
import Pagination from '@/components/Pagination';

import useCheckStatus from '@/hooks/useCheckStatus';
import useSearchArtist from '@/hooks/useSearchArtist';
import artistHelper from '@/lib/artistHelper';

import { useAppSelector } from '@/lib/reduxHooks';

const SearchArtists = () => {
  useSearchArtist(true);

  const artists = useAppSelector((state) => state.artists.artists);
  const searchStatus = useAppSelector((state) => state.search.searchStatus);
  const searchError = useAppSelector((state) => state.search.searchError);

  const unsuccess = useCheckStatus(searchStatus, searchError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} search={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && artists && artists?.total > 0 && (
        <div className='flex flex-col gap-6 pb-6'>
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
              {artists.items.map((artist) => {
                const newArtist = artistHelper({ artist });
                return (
                  <Card
                    image={newArtist.image}
                    title={newArtist.name}
                    content={newArtist.type}
                    rounded
                    minWidth={false}
                    href={`/artist/${newArtist.id}`}
                    key={newArtist.id}
                  />
                );
              })}
            </div>
          </div>
          <Pagination path='/search/artists' total={artists.total} />
        </div>
      )}
    </div>
  );
};

export default SearchArtists;
