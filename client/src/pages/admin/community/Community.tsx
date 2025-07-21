import AlertDialogComponent from '@/components/common/AlertDialogComponent';
import PaginationComponent from '@/components/common/PaginationComponent';
import TableComponent from '@/components/common/TableComponent';
import { Switch } from '@/components/ui/switch';
import { queryClient } from '@/config/tanstackConfig/tanstackConfig';
import { useAdminGetAllCommunitiesQuery } from '@/hooks/communitry';
import {  updateCommunityStatus } from '@/services/adminService.ts/communityApi';
import type { TableDetailsType } from '@/types/tableDataTypes';
import { useMutation } from '@tanstack/react-query';
import  { useEffect, useState } from 'react'
import { toast } from 'sonner';



const Community = () => {
    const [communities,setCommunities] = useState<TableDetailsType[]>([]);
    const [currentPage,setCurrentPage]=useState<number>(1)
    const [totalPages,setTotalPages]=useState<number>(0);

    const {data:communityResponse,isLoading,isError}=useAdminGetAllCommunitiesQuery(currentPage,10)

    const {mutate:updateStatusMutation}=useMutation({
        mutationFn:updateCommunityStatus,
        onSuccess:(response)=>{
            toast.success(response.message);
            queryClient.invalidateQueries({queryKey:['adminGetAllCommunities']})
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })


    useEffect(()=>{

        if(communityResponse){
            const {communities,totalPages} = communityResponse;
            setTotalPages(totalPages);

            const transformedDetails = communities.map((community)=>{
                return {
                    id:community._id,
                    content:[
                        community.name,
                        <AlertDialogComponent alertTriggerer={<Switch checked={community.isBlocked}/>} alertDescription="This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers." handleClick={()=>handleStatusChange(community._id,!community.isBlocked)}/>
                    ]
                }
            })

            setCommunities(transformedDetails);
        }
    },[communityResponse])

     function handleStatusChange(communityId:string,status:boolean){
        updateStatusMutation({communityId,status})
    }

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


    const tableHeaders=['name','status'];
  return (
    <div>
      <TableComponent tableHeaders={tableHeaders} tableBody={communities}/>
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    </div>
  )
}

export default Community
