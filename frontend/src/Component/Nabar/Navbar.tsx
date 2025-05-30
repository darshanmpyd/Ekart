import { navbarDataInterface } from "../../Pages/Main/data";
import { useNavigate } from "react-router-dom";
import AvatarMenu from "../Avatar/AvatarMenu";
const Navbar = ({ Navbardata }: { Navbardata: navbarDataInterface[] }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-yellow-400 px-4 py-3 shadow-sm flex justify-between">
      <div className="flex flex-wrap gap-4 items-center">
        {Navbardata.map((Element) => (
          <button
            key={Element.link}
            onClick={() => navigate(Element.link)}
            className="text-gray-700 hover:text-white bg-white hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow"
          >
            {Element.name}
          </button>
        ))}
      </div>
      <div className="pr-5">
        {/* <img src="public\profile.png" alt="Profile" width={40} height={40} /> */}
        <AvatarMenu />
      </div>
    </nav>
  );
};

export default Navbar;
