import { Button } from "@/components/ui/button";
import { getDomain } from "@/services/userService.ts/domainApi";
import type { DomainType } from "@/types/domainTypes";
import type { ApiResponseType } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {AnimatePresence,motion} from 'framer-motion'
import type { LevelType } from "@/types/levelTypes";
import { X } from "lucide-react";

const DomainDetail = () => {
    const [domainDetails, setDomainDetails] = useState<Omit<DomainType,'levels'>>()
    const [levels, setLevels] = useState<LevelType[]>()
    const [tab,setTab]=useState<'about'|'roadMap'>('about')
    const navigate = useNavigate()
    const { domainId } = useParams();

    if (!domainId) navigate(-1)

    const { data: domainResponse, isError, error, isLoading } = useQuery<Required<ApiResponseType<DomainType>>>(
        {
            queryKey: ['domain', domainId],
            queryFn: () => getDomain(domainId as string),
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: false
        }
    )

    useEffect(() => {
        if (domainResponse) {
            const domain = domainResponse.data;
            const {levels,...rest} = domain;
            setLevels(levels);
            setDomainDetails(rest);
            setDomainDetails(domain)
        }
    }, [domainResponse])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Loading...</span>
            </div>
        )
    }

    if (isError || !domainDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Something went wrong. Please try again.</span>
            </div>
        )
    }


    return (
        <div className="font-['Roboto','Arial','sans-serif'] bg-white">

        {
            tab==='about'
            ?<About domainDetails={domainDetails}/>
            :<RoadMap levels={levels}/>
        }

            <div className="flex justify-center">
            <Button className="my-5" onClick={()=>setTab(prev=>prev==='about'?'roadMap':'about')}>About</Button>
            </div>

            {/* Call to Action */}
            <section className="bg-gradient-to-b from-[#8B0000] to-[#0b182e] text-white py-12 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="font-bold text-2xl mb-6">Ready to Take the Leap?</h2>
                    <p className="font-medium text-lg mb-8">
                        By the end of our course, you won’t just “know” {domainDetails.name} - you'll master it. Build real-world projects, craft responsive designs, and create full-stack applications from scratch.<br />
                        Join today and become the full-stack developer companies are searching for.
                    </p>
                    <button className="bg-white text-[#222] border-none rounded-xl px-16 py-4 font-bold text-xl cursor-pointer mt-2">Enroll</button>
                </div>
            </section>

            
        </div>
    )
}

export default DomainDetail;

type AboutProp={
    domainDetails:Omit<DomainType,'levels'>
}
const About=({domainDetails}:AboutProp)=>{
    const domainImage = domainDetails.image || "/mern-logo.png";

    return(
     <div>
        <section className="bg-[#222] text-white pt-10 pb-0">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-12 px-6">
                <img src={domainImage} alt={domainDetails.name} className="w-[220px] h-[220px] rounded-full bg-[#222] object-cover mb-6" />
                <div className="flex-1">
                    <h2 className="font-medium text-xl mb-4">
                        Unlock the power of modern web development by mastering <b>{domainDetails.name}</b>. This hands-on course takes you from the basics to building real-world full-stack applications. Whether you're starting your career or upskilling for the next big opportunity, this is your all-in-one roadmap to becoming a {domainDetails.name} pro.
                    </h2>
                </div>
            </div>
        </section>
        {/* What is MERN */}
        <section className="bg-[#eee] py-8">
            <div className="max-w-3xl mx-auto text-center px-6">
                <h1 className="font-bold text-3xl mb-6">What is {domainDetails.name}?</h1>
                <p className="font-bold text-lg mb-6">
                    {domainDetails.description || (
                        <>
                            {domainDetails.name} isn’t just a buzzword — it’s the powerhouse behind today’s most dynamic websites and apps. {domainDetails.name} stands for MongoDB, Express.js, React, and Node.js — a full-stack JavaScript framework that helps you build everything from small personal projects to large-scale enterprise-level applications.
                        </>
                    )}
                </p>
                <ul className="text-left inline-block text-base font-medium">
                    <li>MongoDB – The database where your app’s data lives.</li>
                    <li>Express.js – The backend framework that handles server logic.</li>
                    <li>React – The front-end library that makes your app interactive and fast.</li>
                    <li>Node.js – The runtime that lets you use JavaScript on the server side.</li>
                </ul>
            </div>
        </section>
        {/* Why Should You Learn */}
        <section className="bg-[#f7f7f7] py-8">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="font-bold text-2xl text-center mb-6">Why Should You Learn {domainDetails.name}?</h2>
                <ul className="text-base font-medium list-none p-0 m-0">
                    <li className="mb-4">
                        🌐 <b>Full-Stack Skills, One Language:</b><br />
                        {domainDetails.name} enables you to build both the frontend and backend using just JavaScript. No juggling multiple languages — one skillset powers everything.
                    </li>
                    <li className="mb-4">
                        🚀 <b>High Demand = High Salary:</b><br />
                        Companies are actively hiring {domainDetails.name} developers because of its speed, flexibility, and scalability. Mastering {domainDetails.name} gives you a competitive edge in the job market.
                    </li>
                    <li className="mb-4">
                        🛠️ <b>Build Real Projects:</b><br />
                        From social media platforms to e-commerce sites, {domainDetails.name} is trusted by top tech companies to deliver high-performance applications.
                    </li>
                    <li>
                        💡 <b>Endless Opportunities:</b><br />
                        Whether you want to freelance, build your own startup, or land your dream job in tech, {domainDetails.name} skills open doors.
                    </li>
                </ul>
                
            </div>
        </section>
    </div>
    )
}

type RoadMapProp={
    levels:LevelType[]|undefined
}
const RoadMap=({levels}:RoadMapProp)=>{

    const [level,setLevel]=useState<LevelType|null>()

    if(!levels) return <div>Nothing to show</div>
    return(
     <div className="py-10 px-10">

        <AnimatePresence>
        {
        level
        &&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="rounded-lg fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border w-4/5 h-4/5 bg-white flex flex-col items-center gap-5 p-6">
            <X onClick={()=>setLevel(null)} className="absolute right-6 bg-black text-white"/>
            <h1 className=" text-5xl capitalize">{level.name}</h1>
            <div>
             <h4 className="text-xl font-semibold text-center">Description</h4>
             <p>{level.description}</p>
            </div>
            <div>
             <h4 className="text-xl font-semibold text-center">Task File</h4>
             <p>{level.taskFile}</p>
            </div>
          </motion.div>
        }
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-10">
          {levels.map((level,index)=>
              <div onClick={()=>setLevel(level)} key={level._id} className="flex justify-center items-center">
                  <div className="border min-w-50 rounded-2xl flex flex-col justify-center items-center gap-2 py-5">
                      <p className="font-bold">Level{index+1}</p>
                      <p className="font-bold">{level.name}</p>
                  </div>
              </div>
          )}
        </div>
        
     </div>
    )
}