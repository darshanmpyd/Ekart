import Navbar from "../../Component/Nabar/Navbar";
import { Outlet } from "react-router-dom";
import { Navbardata } from "./data";
const Main = () => {
  return (
    <>
      <Navbar Navbardata={Navbardata} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Main;
