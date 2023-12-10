/* eslint-disable no-unused-vars */
import { AiOutlineClose } from "react-icons/ai";
import {
  Card,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip, 
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  CalendarIcon,
  UsersIcon,
  FolderIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams, useLocation } from "react-router-dom";

const sidebarItems = [
  {
    linkTo: "dashboard",
    icon: PresentationChartBarIcon,
    label: "Dashboard",
    hasSuffix: false,
  },
  {
    linkTo: "calendar",
    icon: CalendarIcon,
    label: "Calendar",
    hasSuffix: false,
  },
  {
    linkTo: "registration",
    icon: UsersIcon,
    label: "Registrations",
    hasSuffix: false,
  },
  {
    linkTo: "wishlist",
    icon: InboxIcon,
    label: "Wishlist",
    hasSuffix: false,
  },
  {
    linkTo: "tournament-tracking",
    icon: FolderIcon,
    label: "Manage Listings",
    hasSuffix: false,
  },
  {
    linkTo: "messages",
    icon: InboxIcon,
    label: "Settigngs",
    hasSuffix: false,
  },
];

// eslint-disable-next-line react/prop-types
function SidebarItems() {
  let { id } = useParams();
  const location = useLocation();

  return (
    <Card className={`bg-gray-100 border border-gray-300 shadow-lg p-4 h-[55rem] mt-2 text-sm`}>
      {sidebarItems.map((item, key) => (
        <div key={key}>
          <Link to={item.linkTo}>
            <ListItem
              className={`group pl-6 px-10 pt-10 mb-2 rounded-xl py-4 ${
                location.pathname.includes(item.linkTo)
                  ? "bg-orange-400 text-black"
                  : "focus:bg-orange-400 focus:text-black hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              <ListItemPrefix>
                <item.icon className="h-5 w-5 " />
              </ListItemPrefix>
              <p className=" text-blue-gray-700">{item.label}</p>
              {item.hasSuffix && (
                <ListItemSuffix>
                  <Chip
                    value="14"
                    size="sm"
                    variant="ghost"
                    color="orange"
                    className={`${!open && "scale-0"} rounded-full`}
                  />
                </ListItemSuffix>
              )}
            </ListItem>
          </Link>
        </div>
      ))}
    </Card>
  );
}

const Sidebar = () => {
  const isOpen = true;

  return (
    <div
      className={`${
        isOpen ? " fixed top-0 h-full md:block" : "hidden md:sticky h-full"
      } w-[20rem] md:inline-block md:top-0 mx-5 my-3 `}
    >
      {/* Content div starts */}
      <div className="md:hidden relative p-4">
        <AiOutlineClose className="absolute top-5 right-9" />
      </div>
      <div className="pt-4 md:pt-0 ">
        <SidebarItems />
      </div>
      {/* Content div ends */}
    </div>
  );
};

export default Sidebar;
