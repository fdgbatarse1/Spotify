import Image from 'next/image';

import singlePlaylistResponseHelper from '@/lib/singlePlaylistResponseHelper';
import { useAppSelector } from '@/lib/reduxHooks';
import DeletePlaylist from '@/components/Controls/DeletePlaylist';
import EditPlaylist from '@/components/Controls/EditPlaylist';
import { useSession } from 'next-auth/react';
import { ICustomSession } from '@/types/common';

const PlaylistDescription = () => {
  const { data: session }: ICustomSession = useSession();

  const playlist = useAppSelector((state) => state.playlists.playlist);

  const newPlaylist = singlePlaylistResponseHelper(playlist);

  return (
    <header className="flex flex-col 2xl:flex-row items-center 2xl:items-end gap-6 font-inter">
      <div className={`relative aspect-square w-200px sm:w-200px 2xl:w-300px`}>
        <Image
          src={newPlaylist.image}
          alt={newPlaylist.name}
          layout="fill"
          className="rounded"
        />
      </div>
      <div className="flex flex-col gap-2 2xl:gap-2">
        <div className="flex justify-center items-center 2xl:justify-start gap-2 w-full">
          <h2 className="font-bold text-sm 2xl:text-base text-center 2xl:text-left uppercase">
            {newPlaylist.public} {newPlaylist.type}
          </h2>
        </div>
        <h1 className="font-bold text-2xl 2xl:text-4xl text-center 2xl:text-left">
          {newPlaylist.name}
        </h1>
        <div className="flex flex-col 2xl:flex-row items-center 2xl:items-center gap-4 2xl:gap-6 font-medium">
          <div className="flex items-center gap-2 2xl:gap-6 text-center 2xl:text-left">
            <p>{newPlaylist.description}</p>
          </div>
        </div>
      </div>
      {newPlaylist.owner === session?.user?.username && (
        <div className="flex lock justify-end gap-2">
          <EditPlaylist />
          <DeletePlaylist id={newPlaylist.id} />
        </div>
      )}
    </header>
  );
};

export default PlaylistDescription;
