import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useMemo } from 'react'

const SideBar = () => {
    const navigate=useNavigate()
    const location = useLocation()
    const pathname = useMemo(()=>location.pathname,[])
  return (
    <div className='fixed bg-white h-full'>
        <aside className="hidden md:flex flex-col w-56 bg-transparent px-4">
	    	<Button onClick={()=>navigate('/mentor/dashboard')} variant="ghost" className={`mb-2 justify-start text-[#222] ${pathname==='/mentor/dashboard'?'bg-[#ffb3bb] text-[#fff] font-bold rounded-lg shadow-none':""}`}>Dashboard</Button>
	    	<Button onClick={()=>navigate('/mentor/reviews/upcoming')} variant="ghost" className={`mb-2 justify-start text-[#222] ${pathname==='/mentor/reviews/upcoming'?'bg-[#ffb3bb] text-[#fff] font-bold rounded-lg shadow-none':""}`}>Upcoming</Button>
	    	<Button onClick={()=>navigate('/mentor/reviews/completed')} variant="ghost" className={`mb-2 justify-start text-[#222] ${pathname==='/mentor/reviews/completed'?'bg-[#ffb3bb] text-[#fff] font-bold rounded-lg shadow-none':""}`}>Completed</Button>
	    	<Button onClick={()=>navigate('/mentor/slots')} variant="ghost" className={`mb-2 justify-start text-[#222] ${pathname==='/mentor/slots'?'bg-[#ffb3bb] hover:bg-[#fd8080] text-[#fff] font-bold rounded-lg shadow-none':""}`}>Slots</Button>
	    	<Button onClick={()=>navigate('/mentor/wallet')} variant="ghost" className={`mb-2 justify-start text-[#222] ${pathname==='/mentor/wallet'?'bg-[#ffb3bb] text-[#fff] font-bold rounded-lg shadow-none':""}`}>Wallet</Button>
	    </aside>
    </div>
  )
}

export default SideBar
