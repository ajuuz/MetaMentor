import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHamburger } from "react-icons/fa";
import './layoutStyle.css';
import { X } from 'lucide-react';

const UserProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-[90vh] flex relative">

        <div className='flex items-center relative  z-2'>
            <div onClick={()=>setSidebarOpen(prev=>!prev)} className={`absolute z-3 sm:hidden transition-all duration-300 ${sidebarOpen?"top-5 translate-x-43 p-1":"top-5 translate-x-2 p-2"}  bg-black text-white  rounded-4xl`}>{!sidebarOpen?<FaHamburger/>:<X/>}</div>
            <div className={`h-7/8 sm:h-full bg-white fixed shadow-lg sm:relative z-2 flex flex-col gap-10 px-20  justify-center transition-all duration-300  -translate-x-full sm:translate-x-0 ${sidebarOpen && "translate-x-0"}`}>
                <div className='font-medium'>Profile</div>
                <div className='font-medium'>Settings</div>
                <div className='font-medium'>Logout</div>
            </div>
        </div>

    <div className='absolute bg-red-100/50 blur-3xl w-[300px] h-[100px] left-60'></div>
    <div className='absolute bg-red-300/20 blur-3xl w-[300px] h-[100px] right-0 bottom-0'></div>
      <div className="flex-1  flex justify-center items-center transition-all duration-300 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfileLayout;
