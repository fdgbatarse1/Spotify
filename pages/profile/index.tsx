import Header from '@/components/Header';
import UserDescription from '@/components/Description/User';
import ArtistsPrev from '@/components/Section/ArtistsPrev';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetUser from '@/hooks/useGetUser';
import useGetMyTopArtists from '@/hooks/useGetMyTopArtists';

import { useAppSelector } from '@/lib/reduxHooks';
import useGetMyTopTracks from '@/hooks/useGetMyTopTracks';
import TracksList from '@/components/TracksList';
import useGetMyFollowedArtists from '@/hooks/useGetMyFollowedArtists';
import FollowedArtistsPrev from '@/components/Section/FollowedArtistsPrev';

const Artist = () => {
  useGetUser();
  useGetMyTopTracks(false);
  useGetMyTopArtists(false);
  useGetMyFollowedArtists();

  const artists = useAppSelector((state) => state.artists.artists);
  const followedArtists = useAppSelector((state) => state.user.followedArtists);
  const tracks = useAppSelector((state) => state.tracks.tracks);

  const userError = useAppSelector((state) => state.user.userProfileError);
  const userStatus = useAppSelector((state) => state.user.userProfileStatus);

  const unsuccess = useCheckStatus(userStatus, userError, <Header goBack={true} />);

  if (unsuccess) {
    return unsuccess;
  }

  return (
    <div className='flex flex-col gap-6'>
      <Header goBack={true} />
      <section className='flex flex-col gap-6'>
        <UserDescription />
        {!unsuccess && tracks && tracks?.total > 0 && (
          <div className='flex flex-col gap-2'>
            <h4 className='text-2xl font-bold text-gray-900 dark:text-white'>Top tracks</h4>
            <TracksList tracks={tracks.items} />
          </div>
        )}
        {!unsuccess && artists && artists?.total > 0 && <ArtistsPrev title='Top Artists' />}
        {!unsuccess && followedArtists && followedArtists.items.length > 0 && (
          <FollowedArtistsPrev title='Followed Artists' />
        )}
      </section>
    </div>
  );
};

export default Artist;
