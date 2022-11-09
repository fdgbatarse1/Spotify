import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';
import albumHelper from '@/lib/albumHelper';

const NewReleasesPrev = () => {
  const newReleases = useAppSelector((state) => state.albums.newReleases);
  const newReleasesStatus = useAppSelector((state) => state.albums.newReleasesStatus);
  const newReleasesError = useAppSelector((state) => state.albums.newReleasesError);

  return (
    <HorizontalList title='New Releases' href='/new-releases'>
      {newReleasesStatus === Status.REJECTED && <ErrorMessage error={newReleasesError} />}
      {newReleasesStatus === Status.FULFILLED &&
        newReleases &&
        newReleases.items.map((newRelease) => {
          const album = albumHelper({ album: newRelease });
          return (
            <Card
              image={album.image}
              title={album.name}
              content={album.artists}
              minWidth={true}
              href={`/album/${album.id}`}
              key={album.id}
            />
          );
        })}
    </HorizontalList>
  );
};

export default NewReleasesPrev;
