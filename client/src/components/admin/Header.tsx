import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Header = () => {
  const navItmes=[{itemName:"Dashboard",itemEndPoint:'dashboard'},
          {itemName:"Mentors",itemEndPoint:"mentors"},
          {itemName:"Students",itemEndPoint:'students'},
          {itemName:"Mentor Application",itemEndPoint:'mentors/application'}
        ]
  return (
    <header className='w-screen fixed bg-gray-100 p-5'>
        <div className='container mx-auto flex items-center justify-between'>
            <div className="text-[#E63946] font-bold text-xl">META MENTOR</div>
             <div className="flex  items-center">
                <NavigationMenu className="flex items-center md:space-x-4">
                    <NavigationMenuList>
                      {navItmes.map((item) => (
                          <NavigationMenuItem key={item.itemName}>
                          <NavigationMenuLink  className="text-black hover:text-[#E63946] transition-colors">
                            <Link to={`/admin/${item.itemEndPoint}`}>{item.itemName}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                <Button>Logout</Button>
            </div>
        </div>
    </header>
  )
}

export default Header
