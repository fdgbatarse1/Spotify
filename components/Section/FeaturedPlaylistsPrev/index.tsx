import Card from '@/components/Card';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';
import playlistHelper from '@/lib/playlistHelper';

const FeaturedPlaylistsPrev = () => {
  const featuredPlaylists = useAppSelector((state) => state.playlists.featuredPlaylists);
  const featuredPlaylistsStatus = useAppSelector(
    (state) => state.playlists.featuredPlaylistsStatus,
  );
  const featuredPlaylistsError = useAppSelector((state) => state.playlists.featuredPlaylistsError);

  return (
    <HorizontalList title='Featured Playlists' href='/featured-playlists'>
      {featuredPlaylistsStatus === Status.REJECTED && (
        <ErrorMessage error={featuredPlaylistsError} />
      )}
      {featuredPlaylistsStatus === Status.FULFILLED &&
        featuredPlaylists &&
        featuredPlaylists.items.map((featuredPlaylist) => {
          const playlist = playlistHelper({ playlist: featuredPlaylist });
          return (
            <Card
              image={playlist.image}
              title={playlist.name}
              content={playlist.description}
              minWidth={true}
              href={`playlist/${playlist.id}`}
              key={playlist.id}
            />
          );
        })}
    </HorizontalList>
  );
};

export default FeaturedPlaylistsPrev;
