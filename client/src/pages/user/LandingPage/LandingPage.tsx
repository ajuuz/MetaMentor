import { Button } from '@/components/ui/button'
import './landingPage.css'
import { HeroSection1, HeroSection2 } from '@/components/user/HeroSection'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const LandingPage = () => {
  const [heroSection,setHeroSection]=useState<boolean>(false)
  const heroSectionTimerRef=useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(()=>{
    heroSectionTimerRef.current=setInterval(()=>{
      setHeroSection(prev=>!prev)
    },9000)

    return ()=>{
      if(heroSectionTimerRef.current)
      clearInterval(heroSectionTimerRef.current)
    }
  },[])

  return (
    <div>
      
      {/* Hero Section */}
      <section>
        <AnimatePresence>
        {
          heroSection
          ?<HeroSection1/>
          :<HeroSection2/>
        }
        </AnimatePresence>
      </section>

      {/* Domains Section */}
      <section className="py-16 bg-white relative z-1">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#E63946] text-center mb-12">Our Domains</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "MERN", color: "bg-green-500" },
              { name: "RN", color: "bg-blue-500" },
              { name: "Python + React", color: "bg-yellow-500" },
              { name: "Data Science", color: "bg-purple-500" }
            ].map((domain) => (
              <div key={domain.name} className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full ${domain.color}`}></div>
                <p className="mt-4 font-medium">{domain.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#E63946] text-center mb-12">Meet Our Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((mentor) => (
              <div key={mentor} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"></div>
                <h3 className="text-xl font-semibold text-center mb-2">John Doe</h3>
                <p className="text-gray-600 text-center">Senior JavaScript Developer</p>
                <p className="text-gray-500 text-center mt-4">5+ years of experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#E63946] mb-8">What Our Students Say</h2>
            <blockquote className="text-xl italic text-gray-700 mb-8">
              "Meta Mentor helped me transition from a beginner to a confident developer. 
              The 1-on-1 mentorship was exactly what I needed to grow."
            </blockquote>
            <div className="font-semibold">Sarah Johnson</div>
            <div className="text-gray-500">Full Stack Developer</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#E63946]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-white mb-8">Join Meta Mentor today and transform your career</p>
          <Button className="bg-white text-[#E63946] hover:bg-gray-100">
            Get Started Now
          </Button>
        </div>
      </section>

      
    </div>
  )
}

export default LandingPage