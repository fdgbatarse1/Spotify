import Head from "next/head";

import Sidebar from "./Sidebar";
import Player from "./Player";
import { useSession } from "next-auth/react";
import { ICustomSession } from "@/types/common";
import { useAppSelector } from "@/lib/reduxHooks";
import { useEffect, useState } from "react";

interface ILayout {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: ILayout) => {
  const { data: session }: ICustomSession = useSession();
  const accessToken = session?.user?.accessToken;
  const [showPlayer, setShowPlayer] = useState(false);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title ? `${title} | Spotify` : "Spotify"}</title>
        <meta
          name="description"
          content="Music webapp that use spotify API to find the right music or podcast for every moment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-phone-layout grid-rows-phone-layout md:grid-cols-layout md:grid-rows-layout lg:grid-rows-large-layout w-full min-h-screen bg-gray-50 dark:bg-gray-800">
        <Sidebar />
        <div className="row-start-1 p-4 md:p-8 overflow-y-auto">{children}</div>
        {showPlayer && (
          <div className="relative col-span-1 md:col-span-2">
            <div className="fixed bottom-20 md:bottom-0 left-0 right-0 z-30">
              <Player accesstoken={accessToken} trackUri={currentTrack?.uri} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
