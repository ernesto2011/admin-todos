import Image from "next/image"
import Link from "next/link"
import { CiLogout } from "react-icons/ci"
import { SidebarItem } from "./SidebarItem";
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline } from "react-icons/io5";
import { MdOutlineCookie } from "react-icons/md";

const menuItems = [
  {
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
    text: "Dashboard",
  },
  {
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
    text: "Rest todos",
  },
  {
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
    text: "Server actions",
  },
  {
    path: "/dashboard/cookies",
    icon: <MdOutlineCookie size={30} />,
    text: "Cookies",
  },
];
export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
              <div className="-mx-6 px-6 py-4">
                <Link href="#" title="home">
                  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s" className="w-32" width={128} height={50} alt="tailus logo"/>
                </Link>
              </div>
    
              <div className="mt-8 text-center">
                <Image src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436191.jpg?t=st=1737484883~exp=1737488483~hmac=7d069f917ea2ee2e2bb5c4c411613f73cf472e88ac4ed771cf1117467f752609&w=740" alt="" width={112} height={112} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
                  <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
                  <span className="hidden text-gray-400 lg:block">Admin</span>
              </div>
    
              <ul className="space-y-2 tracking-wide mt-8">
                {
                    menuItems.map((item)=>(
                        <SidebarItem key={item.path} {...item} />
                    ))
                }
              </ul>
            </div>
            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
              <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <CiLogout />
                <span className="group-hover:text-gray-700">Logout</span>
              </button>
            </div>
          </aside>
  )
}
