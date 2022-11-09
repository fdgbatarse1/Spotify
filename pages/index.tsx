import Header from '@/components/Header';
import CategoriesPrev from '@/components/Section/CategoriesPrev';
import NewReleasesPrev from '@/components/Section/NewReleasesPrev';
import FeaturedPlaylistsPrev from '@/components/Section/FeaturedPlaylistsPrev';

import useGetNewReleases from '@/hooks/useGetNewReleases';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';

import Loading from '@/components/Loading';
import useGetFeaturedPlaylists from '@/hooks/useGetFeaturedPlaylists';
import useGetCategories from '@/hooks/useGetCategories';

const Home = () => {
  useGetNewReleases(false);
  useGetFeaturedPlaylists(false);
  useGetCategories(false);

  const newReleasesStatus = useAppSelector((state) => state.albums.newReleasesStatus);
  const categoriesStatus = useAppSelector((state) => state.categories.categoriesStatus);
  const featuredPlaylistsStatus = useAppSelector(
    (state) => state.playlists.featuredPlaylistsStatus,
  );

  return (
    <>
      {newReleasesStatus === Status.PENDING ||
      categoriesStatus === Status.PENDING ||
      featuredPlaylistsStatus === Status.PENDING ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-6'>
          <Header />
          <NewReleasesPrev />
          <FeaturedPlaylistsPrev />
          <CategoriesPrev />
        </div>
      )}
    </>
  );
};

export default Home;
