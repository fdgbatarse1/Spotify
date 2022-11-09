import Header from '@/components/Header';
import SeeAllFavoriteAlbums from '@/components/seeAll/FavoriteAlbums';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetMySavedAlbums from '@/hooks/useGetMySavedAlbums';

import { useAppSelector } from '@/lib/reduxHooks';

const FavoriteAlbums = () => {
  useGetMySavedAlbums(true);

  const favoriteAlbums = useAppSelector((state) => state.favorites.favoriteAlbums);
  const favoriteAlbumsStatus = useAppSelector((state) => state.favorites.favoriteAlbumsStatus);
  const favoriteAlbumsError = useAppSelector((state) => state.favorites.favoriteAlbumsError);

  const unsuccess = useCheckStatus(favoriteAlbumsStatus, favoriteAlbumsError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} search={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && favoriteAlbums && favoriteAlbums?.total > 0 && (
        <SeeAllFavoriteAlbums path='/your-library/albums' />
      )}
    </div>
  );
};

export default FavoriteAlbums;
