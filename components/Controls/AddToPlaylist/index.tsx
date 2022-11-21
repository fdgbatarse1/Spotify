import { VscLibrary } from "@react-icons/all-files/vsc/VscLibrary";
import debounce from "lodash/debounce";

import useSpotify from "@/hooks/useSpotify";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { Routes } from "@/lib/enums";

const AddToPlaylist = ({ id }: { id: string | undefined }) => {
  const spotifyApi = useSpotify();

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [myPlaylists, setMyPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  useEffect(() => {
    const getPlaylistsAsync = async () => {
      const data = await spotifyApi.getUserPlaylists();
      const playlists = data.body.items;
      setMyPlaylists(playlists);
    };

    getPlaylistsAsync();
  }, [spotifyApi]);

  const handler = () => {
    setShowModal(true);
  };

  const confirmationHandler = (playlistId: string, playlistName: string) => {
    if (!id) return;
    const asyncFunction = async () => {
      try {
        await spotifyApi.addTracksToPlaylist(playlistId, [id]);
        setMessage(`Track saved in ${playlistName}`);
      } catch (e) {
        if (typeof e === "string") {
          setMessage(e);
        } else if (e instanceof Error) {
          setMessage(e.message);
        }
        setMessage("Couln't save track in playlist");
      } finally {
        setTimeout(() => {
          setMessage("");
          setShowModal(false);
        }, 2000);
      }
    };

    asyncFunction();
  };

  return (
    <div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        {message ? (
          <div>{message}</div>
        ) : (
          <div className="flex flex-col gap-6 font-inter text-sm sm:text-base text-black md:text-lg text-center font-medium">
            <p className="font-inter font-bold">Add track to</p>
            <div className="flex flex-col max-h-72 overflow-y-auto">
              {myPlaylists &&
                myPlaylists.map((playlist) => {
                  return (
                    <button
                      key={playlist.id}
                      onClick={() =>
                        confirmationHandler(playlist.id, playlist.name)
                      }
                    >
                      {playlist?.name}
                    </button>
                  );
                })}
            </div>
            <p
              className="font-inter font-medium cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Close
            </p>
          </div>
        )}
      </Modal>
      <VscLibrary
        className="text-base md:text-lg lg:text-2xl min-w-32px cursor-pointer"
        onClick={debounce(handler, 300)}
      />
    </div>
  );
};

export default AddToPlaylist;
