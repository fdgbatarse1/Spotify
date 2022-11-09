import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';
import trackHelper from '@/lib/trackFullHelper';

interface IFavoriteTracksPrev {
  title: string;
  href: string;
}

const FavoriteTracksPrev = ({ title, href }: IFavoriteTracksPrev) => {
  const favoriteTracks = useAppSelector((state) => state.favorites.favoriteTracks);
  const favoriteTracksStatus = useAppSelector((state) => state.favorites.favoriteTracksStatus);
  const favoriteTracksError = useAppSelector((state) => state.favorites.favoriteTracksError);

  return (
    <HorizontalList title={title} href={href}>
      {favoriteTracksStatus === Status.REJECTED && <ErrorMessage error={favoriteTracksError} />}
      {favoriteTracksStatus === Status.FULFILLED &&
        favoriteTracks &&
        favoriteTracks.items.map((favoriteTrack) => {
          const track = favoriteTrack.track;
          const newTrack = trackHelper({ track });
          return (
            <Card
              image={newTrack.image}
              title={newTrack.name}
              minWidth={true}
              content={newTrack.type}
              href={`/track/${newTrack.id}`}
              key={newTrack.id}
            />
          );
        })}
    </HorizontalList>
  );
};

export default FavoriteTracksPrev;
