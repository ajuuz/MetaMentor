import Navbar from '@/components/user/Navbar'
import { useUserStore } from '@/zustand/userStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/user/Footer'
import { listenForForegroundMessages } from '@/config/firebaseConfig/firebaseConfig'

const UserLayout = () => {

  const {user} = useUserStore()

  useEffect(()=>{
    if(user){
      listenForForegroundMessages()
    }
  },[])

  return (
    <div className='pt-17 flex flex-col min-h-screen justify-between'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default UserLayout
