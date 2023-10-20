/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";


import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
  Avatar
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon
} from "@heroicons/react/24/outline";
import { BiBook, BiHome } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

 
const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};
 
const navListMenuItems = [
  {
    color: "blue",
    icon: FlagIcon,
    title: "About us",
    description: "Learn about our story and our mission statement.",
    navLink: "/about"
  },
  {
    color: "orange",
    icon: ChatBubbleOvalLeftIcon,
    title: "Press",
    description: "News and writings, press releases, and resources",

  },
  {
    color: "green",
    icon: UsersIcon,
    title: (
      <div className="flex items-center gap-1">
        Careers{" "}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="We're hiring!"
          className="capitalize"
        />
      </div>
    ),
    description: "We are always looking for talented people. Join us!",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Legal",
    description: "All the stuff that we dan from legal made us add.",
  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "Products",
    description: "Checkout our products that helps a startup running.",
  },
  {
    color: "teal",
    icon: FaceSmileIcon,
    title: "Icons",
    description: "Set of beautiful icons that you can use in your project.",
  },
  {
    color: "cyan",
    icon: PuzzlePieceIcon,
    title: "UI Kits",
    description: "High quality UI Kits helps you to 2x faster.",
  },
  {
    color: "pink",
    icon: GiftIcon,
    title: "Open Source",
    description: "List of all our open-source projects, it's all free.",
  },
];
 


function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color }, key) => (
      <Link to={""} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
 
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 space-x-2 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
    <Link to={"/"}>
      <Typography
      as="a"
      variant="small"
      color="blue-gray"
      className="font-normal"
      >
      <ListItem className=" flex flex-row justify-center items-center gap-x-2 py-2 pr-4">
      <BiHome className="h-[18px] w-[18px]" />
      Home
      </ListItem>
      </Typography>
    </Link>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <Link to={"/about"}>
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <FiInfo className="h-[18px] w-[18px]" />
            About us
          </ListItem>
        </Link>
      </Typography>
      <Link to={"/features"}>
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <CubeTransparentIcon className="h-[18px] w-[18px]" />
            Features
          </ListItem>
        </Typography>
      </Link>
      <Link to={"/blogs"}>
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <BiBook className="h-[18px] w-[18px]" />
            Blog
          </ListItem>
      </Typography>
      </Link>
      
        {/* *
      <NavListMenu />
       
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <UserCircleIcon className="h-[18px] w-[18px]" />
          Account
        </ListItem>

      </Typography>
       */}
       
    </List>
  );
}

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/user/profile"
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link: "/user/profile"
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    link: "/o/messages"
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    link: "/user/help"
  },
];
 
function ProfileMenu() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
 
  const closeMenu = () => setIsMenuOpen(false);

  const [loggedIn , setLoggedIn] = useState(true);

  const logOutUser = ()=>{
    setLoggedIn(false)
    dispatch(logout())
    navigate('/user/login')
  }


  const handleMenuItemClick = (link) => {
      // Implement your signout logic here
      dispatch(logout())
      navigate('/user/login')
      console.log("Signing out...");
      closeMenu(); // Close the menu
  };
  
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link key={label} to={link}>
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded `}

            >
              {React.createElement(icon, {
                className: `h-4 w-4`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={"inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
            
            </Link>

          );
        })}
        <MenuItem
              key={"signout"}
              onClick={logOutUser}
              className={`flex items-center hover:text-red-500 text-red-500 gap-2 rounded "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}

            >
            
              <PowerIcon className="w-4 h-4"/>{"Sign out"}
            </MenuItem>
      </MenuList>
    </Menu>
  );
}



function NavWithoutUser (){


const navigate = useNavigate();
const { pathname } = useLocation();
const [loggedIn , setLoggedIn] = useState(true);

  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const logOutUser = ()=>{
    setLoggedIn(false)
    dispatch(logout())
    navigate('/user/login')
  }

  
  let params = useLocation();
  const path = params.pathname;

  return(
    // !pathname == "/user/login" && !pathname == "/user/register" &&

<Navbar className="min-w-full px-4 py-2 shadow-none border-solid border-gray-200 border-b-2 rounded-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          G-Sport
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>

        

        {
          loggedIn ? (
            <ProfileMenu/>
          ) : (
            <div className="hidden gap-2 lg:flex">
              <Button variant="text" size="sm" color="blue-gray" onClick={()=> navigate("/user/login")}>
                Sign In
              </Button>
              <Button variant="gradient" color="orange" size="sm" onClick={() => navigate("/user/register")}>
                Sign Up
              </Button>
            </div>
          )
        }

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>

        
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {/* <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Sign In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign Up
          </Button> 
          <ProfileMenu />*/}
        </div>
      </Collapse>
    </Navbar>
  )
}
 
export default function Example() {
  
  return (

    <NavWithoutUser/>
  );
}