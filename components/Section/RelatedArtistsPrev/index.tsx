import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import artistHelper from '@/lib/artistHelper';
import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';

interface IRelatedArtistsPrev {
  title: string;
}

const RelatedArtistsPrev = ({ title }: IRelatedArtistsPrev) => {
  const artists = useAppSelector((state) => state.artists.relatedArtists);
  const artistsStatus = useAppSelector((state) => state.artists.relatedArtistsStatus);
  const artistsError = useAppSelector((state) => state.artists.relatedArtistsError);

  return (
    <HorizontalList title={title}>
      {artistsStatus === Status.REJECTED && <ErrorMessage error={artistsError} />}
      {artistsStatus === Status.FULFILLED &&
        artists &&
        artists.map((artist) => {
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

export default RelatedArtistsPrev;
