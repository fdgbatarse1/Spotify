import Header from '@/components/Header';
import SeeAllAlbums from '@/components/seeAll/Albums';

import useCheckStatus from '@/hooks/useCheckStatus';
import useSearchAlbum from '@/hooks/useSearchAlbum';

import { useAppSelector } from '@/lib/reduxHooks';

const SearchAlbums = () => {
  useSearchAlbum(true);

  const albums = useAppSelector((state) => state.albums.albums);
  const searchStatus = useAppSelector((state) => state.search.searchStatus);
  const searchError = useAppSelector((state) => state.search.searchError);

  const unsuccess = useCheckStatus(searchStatus, searchError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} search={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && albums && albums?.total > 0 && <SeeAllAlbums path='/search/albums' />}
    </div>
  );
};

export default SearchAlbums;
