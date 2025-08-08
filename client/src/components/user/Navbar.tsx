import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Menu } from "lucide-react"
import { FaUserCircle } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

import { useUserStore, type UserType } from '@/zustand/userStore'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../ui/button";

const Navbar = () => {
  
  const user:UserType|null= useUserStore((state)=>state.user);
  const navigate = useNavigate();

  return (
      <header className="fixed top-0 w-full bg-white shadow-sm z-2">
        <div className=" mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-[#E63946] font-bold text-xl"><span className="text-black">META</span> MENTOR</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ">
                <NavigationMenu className="flex items-center space-x-4">
                    <NavigationMenuList className="flex gap-5">
                      {["Communities","Domains", "Mentors", "About", "Network", "Rooms", "Highlights", "Dashboard"].map((item) => (
                        <NavigationMenuItem key={item} >
                          <Link className="text-black hover:text-[#E63946] transition-colors" to={`/${item.toLowerCase()}`}>
                            {item}
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

          <div className='flex gap-4 items-center'>
              {!user ? <Button onClick={()=>navigate('/signup')} className="bg-[#E63946] text-white hover:bg-[#dc2f3c]">
                Sign Up
              </Button>
              :
              <div className='flex gap-4 items-center'>
                {user.role==='mentor' && <Button onClick={()=>navigate('mentor/reviews/upcoming')}>Switch to mentor</Button>}
                {user.role==='admin' && <Button onClick={()=>navigate('admin/dashboard')}>Switch to admin</Button>}
                <FaUserCircle onClick={()=>navigate('/profile')} className='cursor-pointer scale-[1.2]'/>
                <FaPaperPlane />
              </div>
              }

               {/* Mobile Navigation */}
               <Sheet>

                 <SheetTrigger className="md:hidden cursor-pointer">
                   <Menu className="h-6 w-6" />
                 </SheetTrigger>

                 <SheetContent className='rounded-l-2xl h-[98vh] my-auto'>
                   <div className="flex flex-col gap-3 mt-6 px-6 py-4  rounded-2xl">
                   <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">Explore</h2>

                    {["Communities","Mentors","About","Network","Rooms","Highlights","Dashboard",].map((item, index) => (
                      <Link  key={index}  to={`/${item.toLowerCase()}`}  className="text-[16px] font-medium text-gray-700 hover:text-[#E63946] hover:pl-2 transition-all duration-200 ease-in-out px-2 py-1 rounded-md hover:bg-[#E63946]/10">
                        {item}
                      </Link>
                    ))}
                  </div>

                 </SheetContent>

               </Sheet>
            </div>

          </div>
        </div>
      </header>
  )
}

export default Navbar
