import { useRouter } from 'next/router';

import Header from '@/components/Header';
import SeeAllAlbums from '@/components/seeAll/Albums';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetArtistAlbums from '@/hooks/useGetArtistAlbums';

import { useAppSelector } from '@/lib/reduxHooks';

const ArtistAlbums = () => {
  const router = useRouter();

  const { id } = router.query;

  useGetArtistAlbums(true);

  const albums = useAppSelector((state) => state.albums.albums);
  const searchStatus = useAppSelector((state) => state.search.searchStatus);
  const searchError = useAppSelector((state) => state.search.searchError);

  const unsuccess = useCheckStatus(searchStatus, searchError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && albums && albums?.total > 0 && <SeeAllAlbums path={`/artist/${id}/albums`} />}
    </div>
  );
};

export default ArtistAlbums;
