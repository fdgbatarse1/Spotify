import Header from '@/components/Header';
import SeeAllFavoriteTracks from '@/components/seeAll/FavoriteTracks';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetMySavedTracks from '@/hooks/useGetMySavedTracks';

import { useAppSelector } from '@/lib/reduxHooks';

const FavoriteTracks = () => {
  const isSaved = useAppSelector((state) => state.tracks.isSaved);
  useGetMySavedTracks(true, isSaved);

  const favoriteTracks = useAppSelector((state) => state.favorites.favoriteTracks);
  const favoriteTracksStatus = useAppSelector((state) => state.favorites.favoriteTracksStatus);
  const favoriteTracksError = useAppSelector((state) => state.favorites.favoriteTracksError);

  const unsuccess = useCheckStatus(favoriteTracksStatus, favoriteTracksError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && favoriteTracks && favoriteTracks?.total > 0 && (
        <SeeAllFavoriteTracks path='/your-library/tracks' />
      )}
    </div>
  );
};

export default FavoriteTracks;
