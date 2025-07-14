import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { useUserStore } from "@/zustand/userStore"
import { logout } from "@/services/authService.ts/authApi"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const Header = () => {


  const logoutDispatch = useUserStore(state=>state.logout)
  const {mutate:logoutMutation}=useMutation({
      mutationFn:logout,
      onSuccess:(response)=>{
        logoutDispatch()
        toast.success(response.message)
      },
      onError:(error)=>{
        toast.error(error.message)
      }
  })


  const handleLogout=()=>{
    logoutMutation()
  }

  return (
     <header className='w-screen fixed top-0 bg-white p-5'>
        <div className=' flex items-center justify-between'>
            <div className="text-[#E63946] font-bold text-xl text-nowrap">META MENTOR</div>
             <div className="flex  items-center">
                <NavigationMenu className="flex items-center md:space-x-4">
                    <NavigationMenuList>
                          <NavigationMenuItem>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    </header>
  )
}

export default Header
