import { useProfileQuery } from "@/hooks/tanstack/profile";
import UserDetails from "@/components/user/userDetails/UserDetails";

const Profile = () => {


  // --------------- Profile Query ----------------
  const { data: profileData ,isLoading,isError} = useProfileQuery();
  console.log(profileData)

  if(isLoading){
    return <div></div>
  }

  if(isError || !profileData){
    return <div className="flex justify-center items-center">Error</div>
  }

  return (
    <UserDetails profileData={profileData}/>
  );
};

export default Profile;
