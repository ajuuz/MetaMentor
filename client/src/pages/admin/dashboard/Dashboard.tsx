import { useState } from 'react';
import './dashboard.css';

const Dashboard = () => {

    
    const [dashBoardCounts,setDashBoardCounts]=useState([["Total Users",1000],["Total Mentors",100],["Total Revenue","Rs.100000"]])
  return (
    <div className='flex min-h-[89.5vh]'>
      <div className='flex-1 flex flex-col gap-20 justify-center items-center'>
        {dashBoardCounts.map((items,index)=>
            <div key={index} className='w-[70%] bg-gradient-to-t from-[#F86666] to-[#F63B3E] p-8 flex justify-between items-center  rounded-2xl text-white shadow-md shadow-[#912b2bd4]'>
                <div className='text-2xl'>
                    {items[0]}
                </div>
                <div className='text-4xl font-bold'>
                    {items[1]}
                </div>
            </div>
        )}
      </div>
      <div className='flex-2 flex items-center justify-center'>
        <h1 className='text-4xl font-bold'>Here comes the chart</h1>
      </div>
    </div>
  )
}

export default Dashboard
