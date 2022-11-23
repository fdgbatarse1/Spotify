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
      <Modal
        onClose={() => setShowModal(false)}
        withoutbackground
        show={showModal}
      >
        {message ? (
          <div className="flex flex-col gap-6 font-inter text-sm rounded-xl sm:text-base md:text-lg text-center bg-spotify-200 text-white p-8 font-medium">
            {message}
          </div>
        ) : (
          <div className="flex  font-mediumflex flex-col gap-6 font-inter text-sm rounded-xl sm:text-base md:text-lg text-center bg-spotify-200 text-white p-8 font-medium">
            <p className="font-inter font-bold">Add track to</p>
            <div className="flex flex-col max-h-72 overflow-y-auto w-full rounded-xl bg-gray-200 text-black ">
              {myPlaylists &&
                myPlaylists.map((playlist) => {
                  return (
                    <button
                      className="hover:bg-gray-900 hover:text-white p-2"
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
            <div>
              <p
                className="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 hover:text-white pointer"
                onClick={() => setShowModal(false)}
              >
                Close
              </p>
            </div>
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
