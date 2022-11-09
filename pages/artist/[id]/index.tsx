import ArtistList from '@/components/ArtistList';
import ArtistDescription from '@/components/Description/Artist';
import Header from '@/components/Header';
import AlbumsPrev from '@/components/Section/AlbumsPrev';
import RelatedArtistsPrev from '@/components/Section/RelatedArtistsPrev';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetArtist from '@/hooks/useGetArtist';
import useGetArtistTopTracks from '@/hooks/useGetArtistTopTracks';
import useGetArtistAlbums from '@/hooks/useGetArtistAlbums';
import useGetRelatedArtist from '@/hooks/useGetRelatedArtist';
import artistHelper from '@/lib/artistHelper';

import { useAppSelector } from '@/lib/reduxHooks';

const Artist = () => {
  useGetArtist();
  useGetArtistTopTracks();
  useGetRelatedArtist();
  useGetArtistAlbums(false);

  const albums = useAppSelector((state) => state.albums.albums);
  const relatedArtists = useAppSelector((state) => state.artists.relatedArtists);

  const artist = useAppSelector((state) => state.artists.artist);
  const artistError = useAppSelector((state) => state.artists.artistError);
  const artistStatus = useAppSelector((state) => state.artists.artistStatus);
  const newArtist = artistHelper({ artist });

  const unsuccess = useCheckStatus(artistStatus, artistError, <Header goBack={true} />);

  if (unsuccess) {
    return unsuccess;
  }

  return (
    <div className='flex flex-col gap-6'>
      <Header goBack={true} />
      <section className='flex flex-col gap-6'>
        <ArtistDescription />
        <ArtistList />
        {albums && albums?.total > 0 && (
          <AlbumsPrev title={`Appears On`} href={`/artist/${newArtist.id}/albums`} />
        )}
        {relatedArtists && relatedArtists.length > 0 && (
          <RelatedArtistsPrev title={`Fans also like`} />
        )}
      </section>
    </div>
  );
};

export default Artist;
