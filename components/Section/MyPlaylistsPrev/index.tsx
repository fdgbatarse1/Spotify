import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import artistHelper from '@/lib/artistHelper';
import { Status } from '@/lib/enums';
import playlistHelper from '@/lib/playlistHelper';
import { useAppSelector } from '@/lib/reduxHooks';
import singlePlaylistResponseHelper from '@/lib/singlePlaylistResponseHelper';

interface IMyPlaylistsPrev {
  title: string;
  href?: string;
}

const MyPlaylistsPrev = ({ title, href }: IMyPlaylistsPrev) => {
  const playlists = useAppSelector((state) => state.playlists.playlists);
  const playlistsStatus = useAppSelector((state) => state.playlists.playlistsStatus);
  const playlistsError = useAppSelector((state) => state.playlists.playlistsError);

  return (
    <HorizontalList title={title} href={href}>
      {playlistsStatus === Status.REJECTED && <ErrorMessage error={playlistsError} />}
      {playlistsStatus === Status.FULFILLED &&
        playlists &&
        playlists.items.map((playlist) => {
          const newPlaylist = playlistHelper({ playlist });
          return (
            <Card
              image={newPlaylist.image}
              title={newPlaylist.name}
              content={newPlaylist.description}
              minWidth={true}
              href={`playlist/${newPlaylist.id}`}
              key={newPlaylist.id}
            />
          );
        })}
    </HorizontalList>
  );
};

export default MyPlaylistsPrev;
