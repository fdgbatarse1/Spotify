import Header from '@/components/Header';
import SeeAllPlaylists from '@/components/seeAll/Playlists';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetMyPlaylists from '@/hooks/useGetMyPlaylists';

import { useAppSelector } from '@/lib/reduxHooks';

const Playlists = () => {
  useGetMyPlaylists(true);

  const playlists = useAppSelector((state) => state.playlists.playlists);
  const playlistsStatus = useAppSelector((state) => state.playlists.playlistsStatus);
  const playlistsError = useAppSelector((state) => state.playlists.playlistsError);

  const unsuccess = useCheckStatus(playlistsStatus, playlistsError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} search={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && playlists && playlists?.total > 0 && (
        <SeeAllPlaylists path='/your-library/playlists' />
      )}
    </div>
  );
};

export default Playlists;
