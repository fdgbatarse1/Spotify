import Header from '@/components/Header';
import PlaylistDescription from '@/components/Description/Playlist';
import Pagination from '@/components/Pagination';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetPlaylist from '@/hooks/useGetPlaylist';
import useGetPlaylistTracks from '@/hooks/useGetPlaylistTracks';

import { useAppSelector } from '@/lib/reduxHooks';
import TracksList from '@/components/TracksList';
import convertPlaylistTracks from '@/lib/convertPlaylistTracks';

const Playlist = () => {
  useGetPlaylist();
  useGetPlaylistTracks();

  const playlist = useAppSelector((state) => state.playlists.playlist);
  const playlistError = useAppSelector((state) => state.playlists.playlistError);
  const playlistStatus = useAppSelector((state) => state.playlists.playlistStatus);

  const playlistTracks = useAppSelector((state) => state.playlists.playlistTracks);

  const unsuccess = useCheckStatus(playlistStatus, playlistError, <Header goBack={true} />);

  if (unsuccess) {
    return unsuccess;
  }

  return (
    <div className='flex flex-col gap-6'>
      <Header goBack={true} />
      <section className='flex flex-col gap-6'>
        <PlaylistDescription />
        <TracksList tracks={convertPlaylistTracks(playlistTracks)} playlist={playlist?.id} />
        {playlist && playlistTracks && (
          <Pagination path={`/playlist/${playlist.id}`} total={playlistTracks?.total} />
        )}
      </section>
    </div>
  );
};

export default Playlist;
