import Header from '@/components/Header';
import AlbumDescription from '@/components/Description/Album';
import AlbumList from '@/components/AlbumList';
import Pagination from '@/components/Pagination';

import { useAppSelector } from '@/lib/reduxHooks';

import useGetAlbum from '@/hooks/useGetAlbum';
import useCheckStatus from '@/hooks/useCheckStatus';

const Album = () => {
  useGetAlbum();

  const album = useAppSelector((state) => state.albums.album);
  const albumError = useAppSelector((state) => state.albums.albumError);
  const albumStatus = useAppSelector((state) => state.albums.albumStatus);

  const albumTracks = useAppSelector((state) => state.albums.albumTracks);

  const unsuccess = useCheckStatus(albumStatus, albumError, <Header goBack={true} />);

  if (unsuccess) {
    return unsuccess;
  }

  return (
    <div className='flex flex-col gap-6'>
      <Header goBack={true} />
      <section className='flex flex-col gap-6'>
        <AlbumDescription />
        <AlbumList />
        {album && albumTracks && (
          <Pagination path={`/album/${album.id}`} total={albumTracks?.total} />
        )}
      </section>
    </div>
  );
};

export default Album;
