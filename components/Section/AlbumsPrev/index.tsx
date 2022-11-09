import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';
import albumHelper from '@/lib/albumHelper';

interface IAlbumsPrev {
  title: string;
  href: string;
}

const AlbumsPrev = ({ title, href }: IAlbumsPrev) => {
  const albums = useAppSelector((state) => state.albums.albums);
  const albumsStatus = useAppSelector((state) => state.albums.albumsStatus);
  const albumsError = useAppSelector((state) => state.albums.albumsError);

  return (
    <HorizontalList title={title} href={href}>
      {albumsStatus === Status.REJECTED && <ErrorMessage error={albumsError} />}
      {albumsStatus === Status.FULFILLED &&
        albums &&
        albums.items.map((album) => {
          const newAlbum = albumHelper({ album });
          return (
            <Card
              image={newAlbum.image}
              title={newAlbum.name}
              content={newAlbum.artists}
              minWidth={true}
              href={`/album/${newAlbum.id}`}
              key={newAlbum.id}
            />
          );
        })}
    </HorizontalList>
  );
};

export default AlbumsPrev;
