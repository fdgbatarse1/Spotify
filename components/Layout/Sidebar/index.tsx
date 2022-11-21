import Link from "next/link";
import { FaSpotify } from "@react-icons/all-files/fa/FaSpotify";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { HiOutlineViewGrid } from "@react-icons/all-files/hi/HiOutlineViewGrid";
import { useTheme } from "next-themes";
import { Routes, Navigation } from "@/lib/enums";

import Button from "./Button";
import DarkModeButton from "./DarkModeButton";
import { useEffect, useState } from "react";

const RenderThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    return (
      <DarkModeButton
        className=" dark:text-white"
        onClick={() => setTheme("light")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      </DarkModeButton>
    );
  } else {
    return (
      <DarkModeButton onClick={() => setTheme("dark")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </DarkModeButton>
    );
  }
};

const Sidebar = () => {
  return (
    <nav className="row-start-3 md:row-start-1 md:flex flex-col gap-6 pt-2 md:p-6 bg-gray-200 border-t md:border-r border-gray-300 dark:bg-gray-700">
      <div className="hidden md:flex justify-start items-center gap-4">
        <FaSpotify className="text-5xl text-green-500 select-none" />
        <p className="text-green-500 font-bold text-3xl select-none">Spotify</p>
      </div>
      <ul className="flex justify-around md:flex-col">
        <li>
          <Link href={Routes.HOME} passHref>
            <Button text={Navigation.HOME}>
              <AiFillHome className="text-2xl" />
            </Button>
          </Link>
        </li>
        <li>
          <Link href={Routes.SEARCH} passHref>
            <Button text={Navigation.SEARCH}>
              <AiOutlineSearch className="text-2xl" />
            </Button>
          </Link>
        </li>
        <li>
          <Link href={Routes.YOUR_LIBRARY} passHref>
            <Button text={Navigation.YOUR_LIBRARY}>
              <HiOutlineViewGrid className="text-2xl" />
            </Button>
          </Link>
        </li>
      </ul>
      <RenderThemeChanger />
    </nav>
  );
};

export default Sidebar;
