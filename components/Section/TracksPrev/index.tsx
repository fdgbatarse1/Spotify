import Card from "@/components/Card";
import ErrorMessage from "@/components/Error/Message";
import HorizontalList from "@/components/HorizontalList";

import { Status } from "@/lib/enums";
import { useAppSelector } from "@/lib/reduxHooks";
import trackHelper from "@/lib/trackFullHelper";

interface ITracksPrev {
  title: string;
  href?: string;
}

const TracksPrev = ({ title, href }: ITracksPrev) => {
  const tracks: any = useAppSelector((state) => state.tracks.tracks);
  const tracksStatus = useAppSelector((state) => state.tracks.tracksStatus);
  const tracksError = useAppSelector((state) => state.tracks.tracksError);

  return (
    <HorizontalList title={title} href={href}>
      {tracksStatus === Status.REJECTED && <ErrorMessage error={tracksError} />}
      {tracksStatus === Status.FULFILLED &&
        tracks &&
        tracks.items.map((track: any) => {
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

export default TracksPrev;
