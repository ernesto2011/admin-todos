import Image from "next/image"
import Link from "next/link"
import { CiLogout } from "react-icons/ci"
import { SidebarItem } from "./SidebarItem";
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineCookie } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { auth, signOut } from "@/auth";
import { LogOut } from "./LogOut";

const menuItems = [
  {
    path: "/dashboard",
    icon: <IoCalendarOutline size={24} />,
    text: "Dashboard",
  },
  {
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={24} />,
    text: "Rest todos",
  },
  {
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={24} />,
    text: "Server actions",
  },
  {
    path: "/dashboard/cookies",
    icon: <MdOutlineCookie size={24} />,
    text: "Cookies",
  },
  {
    path: "/dashboard/products",
    icon: <AiOutlineProduct size={24} />,
    text: "Productos",
  },
  {
    path: "/dashboard/wonderpush",
    icon: <IoListOutline size={30} />,
    text: "Notifications",
  },
  {
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
    text: "Perfil",
  },
];
export const Sidebar = async () => {
  const session = await auth()
                  
  const imgUrl = session?.user?.image || "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436191.jpg?t=st=1737484883~exp=1737488483~hmac=7d069f917ea2ee2e2bb5c4c411613f73cf472e88ac4ed771cf1117467f752609&w=740"

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen overflow-y-hidden border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
              <div className="-mx-6 px-6 py-4">
                <Link href="#" title="home">
                  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s" className="w-32 h-10" width={128} height={50} alt="tailus logo"/>
                </Link>
              </div>
    
              <div className="mt-4 text-center">
                  <Image src={imgUrl} alt="" width={80} height={80} className="w-10 h-10 m-auto rounded-full object-cover lg:w-20 lg:h-20"/>
                  <h5 className="hidden mt-2 text-xl font-semibold text-gray-600 lg:block">{session?.user?.name || "No name"}</h5>
                  <span className="hidden text-gray-400 lg:block">Admin</span>
              </div>
    
              <ul className="space-y-2 tracking-wide mt-4">
                {
                    menuItems.map((item)=>(
                        <SidebarItem key={item.path} {...item} />
                    ))
                }
              </ul>
            </div>
            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
             <LogOut />
            </div>
          </aside>
  )
}
