import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import artistHelper from '@/lib/artistHelper';
import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';

interface IFollowedArtists {
  title: string;
  href?: string;
}

const FollowedArtists = ({ title, href }: IFollowedArtists) => {
  const artists = useAppSelector((state) => state.user.followedArtists);
  const artistsStatus = useAppSelector((state) => state.user.followedArtistsStatus);
  const artistsError = useAppSelector((state) => state.user.followedArtistsError);

  return (
    <HorizontalList title={title} href={href}>
      {artistsStatus === Status.REJECTED && <ErrorMessage error={artistsError} />}
      {artistsStatus === Status.FULFILLED &&
        artists &&
        artists.items.map((artist) => {
          const newArtist = artistHelper({ artist });
          return (
            <Card
              image={newArtist.image}
              title={newArtist.name}
              minWidth={true}
              rounded
              content={newArtist.type}
              href={`/artist/${newArtist.id}`}
              key={newArtist.id}
            />
          );
        })}
    </HorizontalList>
  );
};

export default FollowedArtists;
