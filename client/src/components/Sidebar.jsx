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
import { Link } from "react-router-dom";
// import { ChevronRightIcon, XIcon } from '@heroicons/react/outline';

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
    linkTo: "tournaments",
    icon: FolderIcon,
    label: "Tournament Tracking",
    hasSuffix: false,
  },
  {
    linkTo: "teams",
    icon: UsersIcon,
    label: "Teams",
    hasSuffix: false,
  },
  {
    linkTo: "messages",
    icon: InboxIcon,
    label: "Messages",
    hasSuffix: true,
  },
];

// eslint-disable-next-line react/prop-types
function SidebarItems (){
  return (
    <Card
        className={`bg-white shadow-xl md:shadow-none h-full mt-2`}
      > 
        {sidebarItems.map((item, key) => (
          <div key={key} >
            <Link  to={item.linkTo}>
              <ListItem 
                className={`group pl-6 w-full rounded-none py-4 focus:bg-orange-50 focus:text-orange-500 hover:bg-orange-50 hover:text-orange-500 `}
              >
                <ListItemPrefix>
                  <item.icon className="h-5 w-5 group-hover:scale-105 group-hover:translate-x-1 transition-transform duration-200 ease-in" />
                </ListItemPrefix>
                <p className=" text-blue-gray-700 group-hover:translate-x-1 transition-transform duration-200 ease-in">{item.label}</p>
                {item.hasSuffix && (
                  <ListItemSuffix >
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

  )
}

const Sidebar = () => {
const isOpen = false;
  return (
      <div
        className={`${
          isOpen ? "w-80 fixed top-0 h-full md:block" : "hidden md:sticky h-full"
        } w-80 md:w-64 md:inline-block md:top-0 bg-white border-r-2`}
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