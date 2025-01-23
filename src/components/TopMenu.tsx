import { cookies } from "next/headers"
import Link from "next/link"
import { CiBellOn, CiChat1, CiMenuBurger, CiSearch } from "react-icons/ci"

const getTotalCount = (cart: {[di:string]:number}):number=>{
    let items =0
    Object.values(cart).forEach((value)=>{
        items += value as number
    })
    return items
}
export const TopMenu = () => {
    const cookieStore = cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')
    const totalItems =getTotalCount(cart)
  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">

          <div className="px-6 flex items-center justify-between space-x-4">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
            <button className="w-12 h-16 -mr-2 border-r lg:hidden">
              <CiMenuBurger size={30} />
            </button>
            <div className="flex space-x-2">
              
              <div hidden className="md:block">
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                  <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <CiSearch />
                  </span>
                  <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                </div>
              </div>
              
              <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                <CiSearch />
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                <CiChat1 size={25} />
              </button>
              <Link href='/dashboard/cart' className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
              <div className="relative inline-block">
                {
                    totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 flex justify-center items-center bg-blue-600 text-white text-xs rounded-full w-4 h-5 lg:w-4 lg:h-5 xs:w-2 xs:h-2">
                    {totalItems}
                </span>
                    )
                }
                
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx={9.549} cy={19.049} r={1.701}></circle><circle cx={16.96} cy={19.049} r={1.701}></circle><path d="m5.606 5.555l2.01 6.364c.309.978.463 1.467.76 1.829c.26.32.599.567.982.72c.435.173.947.173 1.973.173h3.855c1.026 0 1.538 0 1.972-.173c.384-.153.722-.4.983-.72c.296-.362.45-.851.76-1.829l.409-1.296l.24-.766l.331-1.05a2.5 2.5 0 0 0-2.384-3.252zm0 0l-.011-.037a7 7 0 0 0-.14-.42a2.92 2.92 0 0 0-2.512-1.84C2.84 3.25 2.727 3.25 2.5 3.25"></path></g></svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
  )
}
