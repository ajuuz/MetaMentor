import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reviewGrowthData = [
	100, 120, 140, 200, 180, 90, 160, 130, 220, 300, 350, 400
];
const months = [
	"JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const Dashboard = () => {
	return (
		<div className="min-h-screen bg-[#fff] flex flex-col">
			<div className="flex flex-1">
				{/* Sidebar */}
				
				{/* Main Content */}
				<main className="flex-1 px-4 md:px-12 py-8">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl md:text-2xl font-semibold">Good Morning <span className="text-[#ff5e8a] font-bold">Alexander</span></h2>
						<div className="flex items-center gap-4">
							<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffe0e6] text-[#ff5e8a] text-2xl"><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-7 h-7'><path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' /><path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z' /></svg></span>
							<Button className="bg-[#ffb3bb] text-[#fff] font-bold rounded-lg px-6">Logout</Button>
						</div>
					</div>
					{/* Red Card Section */}
					<Card className="bg-gradient-to-br from-[#d90429] to-[#ff5e8a] rounded-2xl p-8 text-white shadow-lg relative mb-10">
						<div className="text-lg md:text-xl font-semibold mb-2">Today's Scheduled Review's Count</div>
						<div className="text-5xl font-bold mb-8">6</div>
						<div className="absolute left-8 bottom-2">
							<Card className="bg-[#fff3f6] rounded-xl px-8 py-4 text-[#222] shadow-md">
								<div className="text-base font-semibold mb-1">Total Review Taken</div>
								<div className="text-3xl font-bold">40</div>
							</Card>
						</div>
					</Card>
					{/* Review Growth Section */}
					<div className="mt-10">
						<h3 className="text-xl font-bold mb-4">Review Growth</h3>
						<Card className="rounded-2xl p-6 shadow-md">
							<div className="flex justify-between items-center mb-2">
								<span className="text-sm font-semibold text-[#222]">Activity</span>
								<select className="bg-transparent text-[#222] font-semibold">
									<option>Month</option>
								</select>
							</div>
							{/* Bar Chart */}
							<div className="flex items-end h-56 gap-2 w-full">
								{reviewGrowthData.map((val, i) => (
									<div key={i} className="flex flex-col items-center w-6">
										<div className="bg-gradient-to-t from-[#ff5e8a] to-[#fff3f6] rounded-t-lg" style={{ height: `${val/4}px`, width: '100%' }}></div>
										<span className="text-xs text-[#888] mt-2">{months[i]}</span>
									</div>
								))}
							</div>
						</Card>
					</div>
				</main>
			</div>
			
		</div>
	);
};

export default Dashboard;
