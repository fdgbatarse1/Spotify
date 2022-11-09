import Card from '@/components/Card';
import Header from '@/components/Header';
import Pagination from '@/components/Pagination';

import useCheckStatus from '@/hooks/useCheckStatus';
import useSearchTrack from '@/hooks/useSearchTrack';

import trackHelper from '@/lib/trackFullHelper';
import { useAppSelector } from '@/lib/reduxHooks';

const SearchTracks = () => {
  useSearchTrack(true);

  const tracks = useAppSelector((state) => state.tracks.tracks);
  const searchStatus = useAppSelector((state) => state.search.searchStatus);
  const searchError = useAppSelector((state) => state.search.searchError);

  const unsuccess = useCheckStatus(searchStatus, searchError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} search={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && tracks && tracks?.total > 0 && (
        <div className='flex flex-col gap-6 pb-6'>
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
              {tracks.items.map((track) => {
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
          <Pagination path='/search/tracks' total={tracks.total} />
        </div>
      )}
    </div>
  );
};

export default SearchTracks;
