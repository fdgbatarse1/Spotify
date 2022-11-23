import RenderThemeChanger from "../RenderThemeChanger";
import Avatar from "./Avatar";
import CreatePlaylist from "./CreatePlaylist";
import LeftArrow from "./LeftArrow";
import Search from "./Search";

interface IHeader {
  goBack?: boolean;
  search?: boolean;
  createPlaylist?: boolean;
}

const Header = ({ goBack, search, createPlaylist }: IHeader) => {
  return (
    <header
      className={`grid grid-cols-phone-header items-center gap-6 ${
        search ? "sm:grid-cols-header" : ""
      }`}
    >
      <div className="flex">{goBack && <LeftArrow />}</div>
      <div className="flex gap-2 sm:gap-6 justify-end sm:order-2">
        <Avatar />
        {createPlaylist && (
          <div className="order-2 sm:-order-1">
            <CreatePlaylist />
          </div>
        )}
        <RenderThemeChanger />
      </div>
      {search && (
        <div className="col-span-2 sm:col-span-1 sm:max-w-200px">
          <Search />
        </div>
      )}
    </header>
  );
};

export default Header;
