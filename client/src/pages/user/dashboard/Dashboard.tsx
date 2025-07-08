import { getEnrolledDomain } from "@/services/userService.ts/domainApi"
import type{ DomainType } from "@/types/domainTypes"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const enrolledDomains = [
	{
		id: 1,
		name: 'MERNCraft: Full-Stack from Scratch',
		description: `Unlock the power of modern web development by mastering MongoDB, Express.js, React, and Node.js. This hands-on course takes you from the basics to building real-world full-stack applications. Whether you're starting your career or upskilling for the next big opportunity, this is your all-in-one roadmap to becoming a MERN stack pro.`,
		image: '/mern-logo.png',
		weeks: 29,
		progress: 75,
		reviewer: 'Alexandar',
		upcomingReview: {
			date: 'May 15 2025',
			time: '11:00 am - 11:30 am',
			domain: 'MERN',
		},
		completed: true,
	},
	{
		id: 2,
		name: 'MERNCraft: Full-Stack from Scratch',
		description: `Unlock the power of modern web development by mastering MongoDB, Express.js, React, and Node.js. This hands-on course takes you from the basics to building real-world full-stack applications. Whether you're starting your career or upskilling for the next big opportunity, this is your all-in-one roadmap to becoming a MERN stack pro.`,
		image: '/mern-logo.png',
		weeks: 29,
		progress: 0,
		reviewer: 'Alexandar',
		completed: false,
	},
]



const Dashboard = () => {

    const [domains,setDomains]=useState<Omit<DomainType,'levels'>[]>()
    const [totalPages,setTotalPages]=useState<number>(0)
    const [currentPage,setCurrentPage]=useState<number>(0);

    const {data:domainsReponse,isLoading,isError}=useQuery(
        {
          queryKey: ['domain'],
          queryFn:getEnrolledDomain,
          staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
          retry: false
        }
    )

    useEffect(()=>{
        if(domainsReponse){
            const domains = domainsReponse.data;
            // setDomains(domains)
        }
    },[domainsReponse])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Loading...</span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Something went wrong. Please try again.</span>
            </div>
        )
    }

	const completedCount = enrolledDomains.filter((d) => d.completed).length
	const enrolledCount = enrolledDomains.length
	const upcoming = enrolledDomains[0].upcomingReview
	const reviewer = enrolledDomains[0].reviewer
	const domain = enrolledDomains[0].upcomingReview?.domain

	return (
		<div className="min-h-screen bg-[#f7f7f7]">

			{/* Dashboard Main */}
			<div className="bg-[#18184a] rounded-2xl max-w-6xl mx-auto mt-8 p-6 md:p-12 relative">
				<h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 tracking-wide">
					DASHBOARD
				</h1>
				<div className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between items-center">
					<div className="text-white text-lg md:text-xl font-semibold bg-[#18184a]/80 rounded-2xl px-8 py-6">
						<div>
							Completed Domains :{' '}
							<span className="font-bold">{completedCount}</span>
						</div>
						<div>
							Currently Enrolled Domains :{' '}
							<span className="font-bold">{enrolledCount}</span>
						</div>
					</div>
					<div className="bg-black/90 text-white rounded-xl px-8 py-6 text-center md:absolute md:right-12 md:top-12 shadow-lg">
						<div className="font-bold text-lg mb-2">UPCOMING Review</div>
						<div className="text-base mb-1">
							{upcoming?.time}, {upcoming?.date}
						</div>
						<div className="text-base mb-1">
							Reviewer :{' '}
							<span className="font-bold">{reviewer}</span>
						</div>
						<div className="text-base">
							Domain : <span className="font-bold">{domain}</span>
						</div>
					</div>
				</div>

			</div>

		</div>
	)
}

export default Dashboard
