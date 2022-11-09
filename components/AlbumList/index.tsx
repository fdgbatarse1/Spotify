import useGetAlbumTracks from '@/hooks/useGetAlbumTracks';

import { useAppSelector } from '@/lib/reduxHooks';

import AlbumTrackList from '../AlbumTrackList';

const AlbumList = () => {
  const albumTracks = useAppSelector((state) => state.albums.albumTracks);

  useGetAlbumTracks();
  return <AlbumTrackList tracks={albumTracks?.items} />;
};

export default AlbumList;
