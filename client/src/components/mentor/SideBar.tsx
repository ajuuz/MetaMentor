import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const SideBar = () => {
    const navigate=useNavigate()
  return (
    <div className=''>
        <aside className="hidden md:flex flex-col w-56 bg-transparent px-4">
	    	<Button variant="secondary" className="mb-4 bg-[#ffb3bb] text-[#fff] font-bold rounded-lg shadow-none">Dashboard</Button>
	    	<Button variant="ghost" className="mb-2 justify-start text-[#222]">Reviews</Button>
	    	<Button variant="ghost" className="mb-2 justify-start text-[#222]">Current Schedules</Button>
	    	<Button onClick={()=>navigate('/mentor/slots')} variant="ghost" className="mb-2 justify-start text-[#222]">Schedule Time</Button>
	    	<Button variant="ghost" className="mb-2 justify-start text-[#222]">Wallet</Button>
	    </aside>
    </div>
  )
}

export default SideBar
