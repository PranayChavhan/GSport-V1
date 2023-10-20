import { HiOutlineDownload } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
// import { AiOutlineControl } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import { MdNewLabel } from "react-icons/md";
import { BsPlayFill, BsCheck2Circle } from "react-icons/bs";
import { IoIosArrowUp } from 'react-icons/io'
// import { useGetAllTrnmtsQuery } from "../../redux/api/tournament/tournamentApi";
// import FaMoneyBillTrendUp from 'react-icons/fa'
import WorldMap from "react-svg-worldmap";
function HeaderConent() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 items-center justify-between  text-sm">
      <h1 className="text-blue-gray-700 col-span-full md:col-span-3 text-3xl font-bold ">
        Dashboard
      </h1>

      <div className="bg-gray-100 col-span-2 md:col-span-3 h-full w-full rounded-lg flex items-center justify-center gap-2 px-4">
        <BiSearch className="text-blue-gray-700" />
        <input
          placeholder="search"
          className="w-full h-full bg-gray-100  !outline-none"
        />
      </div>
      <div className="md:col-span-1 bg-gray-100 hover:bg-gray-200 text-blue-gray-700 flex gap-2 h-full rounded-lg hover:cursor-pointer items-center justify-center ">
        {" "}
        <HiOutlineDownload /> Download
      </div>
      <div className="md:col-span-1 bg-gray-100 hover:bg-gray-200 text-blue-gray-700 flex items-center justify-center w-max px-2 text-xl h-full rounded-lg hover:cursor-pointer">
      <IoMdOptions className='w-7 h-7 p-1 rounded-md' onClick={()=>{}}/>
      </div>

      </div>
  );
}

function TournamentsUpdate() {
  const tuItems = [
    {
      icon: MdNewLabel,
      label: "new",
      heading: 1,
      subheading: "+1 from yesterday",
      color: "pink",
      iconBg:"bg-pink-300",
      textColor: "text-pink-300"
    },
    {
      icon: BsPlayFill,
      label: "in progress",
      heading: 1,
      subheading: "+1 from yesterday",
      color: "orange",
      iconBg:"bg-orange-300",
      textColor: "text-orange-300"
    },
    {
      icon: BsCheck2Circle,
      label: "completed",
      heading: "16/20",
      subheading: "+1 from yesterday",
      color: "blue",
      iconBg:"bg-blue-300",
      textColor: "text-blue-300"
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 flex-grow py-4">
        {/* Single item starts */}
        {tuItems.map((item, index) => 
          (
            <div key={index} className={`bg-${item.color}-50 flex-1 flex-grow rounded-lg space-y-5  flex flex-col items-start py-5 pl-5 gap-4 shadow-md `}>
              <div className="flex items-center justify-center gap-2">
                <div className={`rounded-full ${item.iconBg} w-10 h-10 flex items-center justify-center text-white text-xl`}>
                  <item.icon/>
                </div>
                <h1 className={`${item.textColor} capitalize text-lg`}>{item.label}</h1>
              </div>
              <h1 className={`${item.textColor} text-4xl pl-2 font-bold`}>{item.heading}</h1>
              <p className={`${item.textColor} text-sm`}>{item.subheading}</p>
            </div>
          )
        )}
        {/* Single item ends */}
      </div>
    </div>
  );
}

function GamesUpdate(){
  const guItems = [
    {
      icon: MdNewLabel,
      label: "data",
      heading: 1,
      bgColor: "bg-purple-50",
      iconBg:"bg-purple-300",
      textColor: "text-purple-300"
    },
    {
      icon: BsPlayFill,
      label: "revenue",
      heading: "$23.3m",
      bgColor: "bg-yellow-50",
      iconBg:"bg-yellow-300",
      textColor: "text-yellow-300"
    },
    {
      icon: BsCheck2Circle,
      label: "completed",
      heading: "16/20",
      bgColor: "bg-teal-50",
      iconBg:"bg-teal-300",
      textColor: "text-teal-300"
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow py-4">
        {/* Single item starts */}
        {guItems.map((item, index) => 
          (
            <div key={index} className={`${item.bgColor} flex-1 rounded-lg shadow-md flex flex-col items-start py-5 pl-5 gap-4`}>
              <div className="flex items-center justify-center gap-2">
                <div className={`rounded-full ${item.iconBg} w-10 h-10 flex items-center justify-center text-white text-xl`}>
                  <item.icon/>
                </div>
                  <h1 className={`text-green-500 capitalize text-md flex items-center `}> <IoIosArrowUp/> 60%</h1>
              </div>
                <h1 className={` capitalize text-lg`}>{item.label}</h1>
              <h1 className={` text-2xl pl-2 font-bold`}>{item.heading}</h1>
              <p className={` text-sm`}>{item.subheading}</p>
            </div>
          )
        )}
        {/* Single item ends */}
      </div>
      </div>
  )
}



const PDashboard = () => {

  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];

  return (
    <div className="h-full">
      <HeaderConent />
      <div className="w-full grid grid-cols-5 mt-4 gap-4">
        <div className="col-start-1 col-end-4">
        <h1 className="text-blue-gray-700 capitalize font-semibold text-lg ">
          tournament updates
        </h1>
            <TournamentsUpdate />
          
          <h1 className="text-blue-gray-700 capitalize font-semibold text-lg px-2 ">
            game updates
          </h1>
          <GamesUpdate />
        
        </div>
        <div className="col-start-4 col-end-6">
        {/** <div className="w-full col-span-3 bg-white shadow-md h-56 rounded-lg"> World Map</div> */}
          <div className="">
          <WorldMap
        color="orange"
        value-suffix="people"
        size="lg"
        data={data}
      />
          </div>
          {/* <div className="col-span-3 bg-white shadow-md h-56 rounded-lg">pie chart</div> */}


        
        </div>
      </div>
    </div>
  );
};

export default PDashboard;