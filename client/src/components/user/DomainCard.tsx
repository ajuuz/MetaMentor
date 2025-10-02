import { config } from "@/config/configuration"
import type { GetEnrolledDomainsRes } from "@/types/response/domain"
import { FaCaretRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

type Props={
  domain:GetEnrolledDomainsRes
}

const DomainCard = ({domain}:Props) => {
  const navigate = useNavigate()

  return (
    <div className="rounded-xl shadow-lg border-t-2 bg-white border-slate-100 min-w-[700px] w-[70%] h-fit relative">

     <img src={config.IMAGE_BASE_URL+domain.image} className="absolute border h-30 shadow-lg w-[20%] max-w-35 left-5 top-20 xl:top-15 rounded" alt={domain.name} />

      <div className="ps-50 py-4 pe-5">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#850A0A] to-[#06022B] bg-clip-text text-transparent">{domain.name}</h2>
        <p className="break-words">{domain.description.length>150?domain.description.slice(0,150)+'...':domain.description}</p>
      </div>

      <div className="flex justify-between items-center ps-50 pe-5 py-2 rounded-b-xl bg-gradient-to-r from-[#06022B] to-[#850A0A] ">
        <div onClick={()=>navigate(`${domain._id}`)} className="bg-white border-6 p-2 rounded-4xl">
            <FaCaretRight size={30}/>
        </div>
        <div className="flex flex-col gap-4">
            <p className="font-medium text-xl text-white">{29} Weeks</p>
            <p className="font-medium text-lg text-white/70">Progress {0}%</p>
        </div>
      </div>

    </div>
  )
}

export default DomainCard
