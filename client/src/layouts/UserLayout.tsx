import Navbar from '@/components/user/Navbar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='pt-17'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default UserLayout
