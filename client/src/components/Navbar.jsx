/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";

import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "/user/profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    path: "/user/editprofile",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    path: "/user/inbox",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    path: "/user/help",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    path: "/signout",
  },
];

function ProfileMenu({ image }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          size="lg"
          variant="text"
          color="orange"
          className="flex  items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="border border-orange-500 p-0.5"
            src={image}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (path === "/signout") {
                  const cookies = new Cookies();
                  localStorage.removeItem("userData");
                  cookies.remove("jwt_auth_token");
                  navigate("/");
                } else {
                  navigate(path);
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-6 w-6 mr-3 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal text-[15px]"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const Topbar = () => {
  const location = useLocation();
  const [profileUrl, setProfileUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const { profile_url } = userData;
      setProfileUrl(profile_url);
    }
  }, []);

  const handleLogout = () => {
    const cookies = new Cookies();
    localStorage.removeItem("userData");
    cookies.remove("jwt_auth_token");
    navigate("/");
  };

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/home"
            className={`flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">GSort</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link
              to="home"
              className={`mr-5 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/home" ? "text-orange-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="aboutus"
              className={`mr-5 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/aboutus" ? "text-orange-500" : ""
              }`}
            >
              About us
            </Link>
            <Link
              to="features"
              className={`mr-5 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/features"
                  ? "text-orange-500"
                  : ""
              }`}
            >
              Features
            </Link>
            <Link
              to="blogs"
              className={`mr-5 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/blogs" ? "text-orange-500" : ""
              }`}
            >
              Blog
            </Link>
          </nav>
          <div>
            {profileUrl ? (
              <div>
                <ProfileMenu image={profileUrl} />
              </div>
            ) : (
              <div>
                <button
                  onClick={handleLogout}
                  className="inline-flex mr-4 items-center bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 text-white rounded text-base mt-4 md:mt-0"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Topbar;
