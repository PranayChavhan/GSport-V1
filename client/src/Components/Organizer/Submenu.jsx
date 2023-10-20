import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from "../../redux/features/SidebarSlice";

export default function Submenu() {

  const dispatch = useDispatch();
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="-z-10 h-12 w-full flex items-center justify-start gap-2 pl-4">
      <div onClick={handleToggleSidebar} className="hover:cursor-pointer" >
        <BiMenuAltLeft  className="w-4 h-4 md:hidden"/>
      </div>
      <Breadcrumbs className="-z-20 bg-transparent">
        <Link href="/components" className="">
          Docs
        </Link>
        <Link href="/components" className="">
          Components
        </Link>
        <Link href="/components">Breadcrumbs</Link>
      </Breadcrumbs>
    </div>
  );
}
