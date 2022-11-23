import { useEffect, useState } from "react";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";

import Modal from "@/components/Modal";

import useSpotify from "@/hooks/useSpotify";
import debounce from "lodash/debounce";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { setIsSaved } from "@/store/features/tracks/tracksSlice";

const TrackFavorite = ({ id }: { id: string | undefined }) => {
  const dispatch = useAppDispatch();
  const spotifyApi = useSpotify();
  const isSaved = useAppSelector((state) => state.tracks.isSaved);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getMySavedTracksAsync = async () => {
      if (spotifyApi.getAccessToken() && typeof id === "string") {
        const data = await spotifyApi.containsMySavedTracks([id]);

        const isTrackSaved = data.body[0];

        if (!isTrackSaved) {
          dispatch(setIsSaved(false));
          return;
        }

        dispatch(setIsSaved(true));
      }
    };

    getMySavedTracksAsync();
  }, [dispatch, id, spotifyApi]);

  const handler = () => {
    if (id) {
      if (isSaved) {
        setShowModal(true);
      } else {
        spotifyApi.addToMySavedTracks([id]);
        dispatch(setIsSaved(true));
      }
    }
  };

  const confirmationHandler = (confirmed: boolean) => {
    if (confirmed && id) {
      spotifyApi.removeFromMySavedTracks([id]);
      dispatch(setIsSaved(false));
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <Modal
        onClose={() => setShowModal(false)}
        withoutbackground
        show={showModal}
      >
        <div className="flex flex-col gap-6 font-inter text-sm rounded-xl sm:text-base md:text-lg text-center bg-spotify-200 text-white p-8 font-medium">
          <p>Do you want to delete this track from your favorites?</p>
          <div className="flex justify-around items-center">
            <button
              className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 hover:text-white pointer"
              onClick={() => confirmationHandler(true)}
            >
              Yes
            </button>
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900 pointer"
              onClick={() => confirmationHandler(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
      {isSaved ? (
        <AiFillHeart
          color="#22c55e"
          className="text-base md:text-lg lg:text-2xl min-w-32px"
          onClick={debounce(handler, 300)}
        />
      ) : (
        <AiOutlineHeart
          className="text-base md:text-lg lg:text-2xl min-w-32px"
          onClick={debounce(handler, 300)}
        />
      )}
    </>
  );
};

export default TrackFavorite;
