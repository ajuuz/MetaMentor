// import { getAllMentors } from '@/services/adminService.ts/mentorApi';
// import { useMutation } from '@tanstack/react-query';
// import { toast } from 'sonner';


// const mentors = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'john@example.com',
//     profileImage: 'https://i.pravatar.cc/150?img=1',
//     expertise: 'JavaScript, React',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     profileImage: 'https://i.pravatar.cc/150?img=2',
//     expertise: 'Python, Django',
//   },
// ];



// const MentorListing = () => {
//     const {mutate:getMentorsMutation}=useMutation({
//     mutationFn:getAllMentors,
//     onSuccess:(response)=>{
//         console.log(response.data)
//     },
//     onError:(error)=>{
//         toast.error(error.message)
//     }
//     })

//     // useEffect(()=>{
//     //     getMentorsMutation({currentPage:1,limit:5,isVerified:true})
//     // },[])
//   return (
//     <div className="min-h-screen">
//         <div className="p-10">
//           <h2 className="text-xl font-semibold mb-4 text-center">Available Mentors</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {mentors.map((mentor) => (
//               <div key={mentor.id} className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
//                 <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
//                   <img
//                     src={mentor.profileImage}
//                     alt={mentor.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-medium">{mentor.name}</h3>
//                   <p className="text-sm text-gray-500">{mentor.email}</p>
//                   <p className="text-sm text-gray-600 mt-1">{mentor.expertise}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//     </div>

//   );
// };

// export default MentorListing;
