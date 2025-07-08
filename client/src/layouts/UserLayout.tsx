import Navbar from '@/components/user/Navbar'
import { eventSourceProvider } from '@/services/commonApi'
import { useUserStore } from '@/zustand/userStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Footer from '@/components/user/Footer'

const UserLayout = () => {

  const {user} = useUserStore()

  useEffect(()=>{
    if(user){
      const eventSource = eventSourceProvider(user.email);
      
      eventSource.onmessage=(event)=>{
        const parsedData = JSON.parse(event.data);
        console.log(parsedData.message)
        const toastId=toast.loading(parsedData.message)
        setTimeout(()=>{
          toast.success(parsedData.message,{
            id:toastId
          })
        },400)
      }
      
      eventSource.onerror=(err)=>{
        console.log("eventsource failed",err)
        eventSource.close();
      }
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
