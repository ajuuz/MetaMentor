import { ArrowRightCircleIcon, Calendar, DollarSign, Lock, Users } from 'lucide-react'
import bgImage from '@/assets/download.svg'
import mentorStudentImage from '@/assets/manager-secretary-discussing-working-thumb-up-white-background-C6eGu2rl.png';
import {easeInOut, motion} from 'framer-motion'
import { Button } from '../ui/button';
export const HeroSection1 = () => {
  return (
   <motion.div
   initial={{opacity:0}}
   animate={{opacity:1}}
   exit={{opacity:0}}
   transition={{duration:0.6,ease:easeInOut}}
   className="px-40 py-29">
          <div className="flex flex-col md:flex-row items-center justify-between gap-20 relative">
            {/* left side*/}
            <div className='flex-1'>
              <p className='text-muted-foreground text-sm mb-2'>Connecting Dreams to Reality</p>
              <h1 className='text-5xl font-bold mb-5'><span>Find Your Perfect</span> <span className='text-red-500'>Professional Guide</span></h1>
              <p className='text-gray-700'>Whether you're starting a new course or refining your skills, Meta Mentor offers curated learning roadmaps and the chance to have your work reviewed by experienced professionals. No more studying in isolation — get expert insights, clear direction, and build with confidence. Avoid the uncertainty of self-paced learning and step into a smarter, more connected educational journey.</p>
              <Button onClick={()=>console.log("working")} className='mt-9 rounded-3xl bg-red-400 hover:bg-red-500 z-1 relative'>Choose Your Domain<ArrowRightCircleIcon className='rounded-lg bg-white text-red-400'/></Button>
            </div>

            {/* rigth side */}
            <div className='flex-1 grid grid-cols-2 gap-4 z-1'>
                <div className="shadow-md rounded-md p-4 bg-white w-full max-w-md">
                    <h5 className="text-lg font-semibold mb-3">Boost Your Career Growth</h5>
                    <div className="w-full h-48">
                      <svg
                        viewBox="0 0 288 216"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >

                          <text x="0" y="200" font-size="10" fill="#888">0%</text>
                          <text x="0" y="150" font-size="10" fill="#888">25%</text>
                          <text x="0" y="100" font-size="10" fill="#888">50%</text>
                          <text x="0" y="50" font-size="10" fill="#888">75%</text>
                          <text x="0" y="10" font-size="10" fill="#888">100%</text>
                          
                        <defs>
                          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#E63946" />
                            <stop offset="50%" stopColor="#FFA500" />
                            <stop offset="100%" stopColor="#4CAF50" />
                          </linearGradient>
                        </defs>

                        <polyline
                          fill="none"
                          stroke="url(#growthGradient)"
                          strokeWidth="2"
                          points="20,200 90,100 160,130 190,100 260,35 288,10"
                          className="growth-line"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 '>
                    <div className='text-red-400 shadow rounded-md text-center p-2 relative -top-3 bg-white'>#metamentor</div>
                    
                    <div className='flex-1 shadow rounded-md bg-white'>
                      <div className='flex gap-2 ps-2'>
                        <div className='bg-red-500 rounded-4xl p-[6px]'></div>
                        <div className='bg-yellow-500 rounded-4xl p-[6px]'></div>
                        <div className='bg-green-500 rounded-4xl p-[6px]'></div>
                      </div>

                      <div className='border rounded-lg m-2 p-1 flex items-center ps-2 gap-2'>
                          <Lock width={12}/>
                          <p className='text-[10px] text-muted-foreground'>https:/www.metamentor.com</p>
                      </div>
                    </div>
                    </div>

                <div className='shadow col-span-2 p-2 ms-5 bg-white'>
                  <span className='block font-serif italic text-[0.7rem]'>"A clear path guided by experience turns effort into achievement faster than wandering alone."</span>
                  <div className='text-end'>
                      <span className='text-red-500 text-xs font-medium'> — Meta Mentor Philosophy</span>
                  </div>
                  </div>
            </div>
            <div className='h-20 w-[50%] absolute bg-red-200  blur-3xl right-0'>
            </div>
          </div>
        </motion.div>
  )
}




export const HeroSection2=()=>{
    return(
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.6,ease:easeInOut}}
        className="px-20 xl:px-30 2xl:px-40 pt-15 xs:pt-24 pb-35 w-full relative">
            <img src={bgImage}  className='w-[1500px] absolute -top-[450px] -left-[400px]' style={{filter: 'hue-rotate(84deg) saturate(150%) brightness(1.2)'}}/>
            <div className='flex flex-col md:flex-row items-center justify-between gap-20 relative'>
              <div className='flex-1 relative hidden xl:block'>
                  <img src={mentorStudentImage} alt="" className='min-w-[600px] scale-167 relative -bottom-3'/>
              </div>

              <div className='flex-1 '>
                  <span>Share Knowledge • Earn Income • Build Legacy</span>
                  <h1 className='text-3xl sm:text-5xl xl:text-4xl 2xl:text-5xl font-bold mb-5'>
                    Become a <span className='text-red-400'>Mentor</span> and
                    Empower the Next Generation
                  </h1>

                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className='rounded-4xl p-2 bg-red-300 inline-block text-white'><Calendar size={16} className='rounded-4'/></div>
                    <div>
                      <span className='font-medium'>Flexible Scheduling</span>
                      <p className='text-muted-foreground text-sm'>Set your own availability and control when you mentor. Allocate slots that fit your busy schedule.</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <div className='rounded-4xl p-2 bg-red-300 inline-block text-white'><DollarSign size={16} className='rounded-4'/></div>
                    <div>
                      <span className='font-medium'>Earn Income</span>
                      <p className='text-muted-foreground text-sm'>Get paid for sharing your expertise. Competitive rates and secure payments directly to your account.</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <div className='rounded-4xl p-2 bg-red-300 inline-block text-white'><Users size={16} className='rounded-4'/></div>
                      <div>
                        <span className='font-medium'>Build Your Legacy</span>
                        <p className='text-muted-foreground text-sm'>Make a lasting impact by guiding aspiring professionals. Shape the future of your industry.</p>
                      </div>
                  </div>
                </div>

                <Button onClick={()=>console.log("working")} className='mt-9 rounded-3xl bg-red-400 hover:bg-red-500 z-1 relative'>Register As Mentor <ArrowRightCircleIcon className='rounded-lg bg-white text-red-400'/></Button>

                  <div className='h-10 w-[50%] absolute bg-red-200  blur-3xl right-0 -bottom-30 z-0'></div>
              </div>
            </div>
        </motion.div>
    )
}