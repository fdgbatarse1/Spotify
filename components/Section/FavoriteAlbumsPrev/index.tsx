import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';
import albumHelper from '@/lib/albumHelper';

interface IFavoriteAlbumsPrev {
  title: string;
  href: string;
}

const FavoriteAlbumsPrev = ({ title, href }: IFavoriteAlbumsPrev) => {
  const favoriteAlbums = useAppSelector((state) => state.favorites.favoriteAlbums);
  const favoriteAlbumsStatus = useAppSelector((state) => state.favorites.favoriteAlbumsStatus);
  const favoriteAlbumsError = useAppSelector((state) => state.favorites.favoriteAlbumsError);

  return (
    <HorizontalList title={title} href={href}>
      {favoriteAlbumsStatus === Status.REJECTED && <ErrorMessage error={favoriteAlbumsError} />}
      {favoriteAlbumsStatus === Status.FULFILLED &&
        favoriteAlbums &&
        favoriteAlbums.items.map((favoriteAlbum) => {
          const newAlbum = albumHelper({ album: favoriteAlbum.album });
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

export default FavoriteAlbumsPrev;
