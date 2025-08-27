import AlertDialogComponent from '@/components/common/AlertDialogComponent';
import FilterComponent from '@/components/common/FilterComponent';
import PaginationComponent from '@/components/common/PaginationComponent';
import TableComponent from '@/components/common/TableComponent';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { queryClient } from '@/config/tanstackConfig/tanstackConfig';
import { useAdminGetAllCommunitiesQuery } from '@/hooks/communitry';
import {  updateCommunityStatus } from '@/services/adminService.ts/communityApi';
import type { TableDetailsType } from '@/types/tableDataTypes';
import { useMutation } from '@tanstack/react-query';
import  { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';



const Community = () => {
    const [communities,setCommunities] = useState<TableDetailsType[]>([]);
    const [totalPages,setTotalPages]=useState<number>(0);

    const [searchParams,setSearchParams]=useSearchParams();
    const [currentPage,setCurrentPage]=useState<number>(Number(searchParams.get("currentPage")) || 1)
    const [searchTerm,setSearchTerm]=useState<string>(searchParams.get("searchTerm") || "")
    const [sortBy,setSortBy]=useState<string>(searchParams.get("sortBy") || "name-asc")

    const {data:communityResponse,isError,isFetching}=useAdminGetAllCommunitiesQuery(currentPage,
        10,
        sortBy,
        searchTerm)

    const {mutate:updateStatusMutation}=useMutation({
        mutationFn:updateCommunityStatus,
        onSuccess:(response)=>{
            toast.success(response.message);
            queryClient.invalidateQueries({queryKey:['getCommunitiesForAdmin']})
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
                    id:community.communityId,
                    content:[
                        community.name.length>15?community.name.slice(0,15)+'...':community.name,
                        <div className="flex justify-center w-full">
                           <img className="w-30 rounded-2xl" src={community.image} />
                         </div>,
                         <Badge variant={community.isBlocked ? "destructive" : "default"}>{community.isBlocked ? "Blocked" : "Active"}</Badge>,
                        <AlertDialogComponent alertTriggerer={<Switch checked={community.isBlocked}/>} alertDescription="This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers." handleClick={()=>handleStatusChange(community.communityId,!community.isBlocked)}/>
                    ]
                }
            })

            setCommunities(transformedDetails);
        }
    },[communityResponse])

    useEffect(() => {
        setSearchParams({
          page: String(currentPage),
          search: searchTerm,
          sortBy,
        });
      }, [currentPage, searchTerm, sortBy, setSearchParams]);

     function handleStatusChange(communityId:string,status:boolean){
        updateStatusMutation({communityId,status})
    }

    const contentForSortSelect=[{value:"name-asc",label:"Name (A → Z)"},
        {value:"name-desc",label:"Name (Z → A)"},
        {value:"createdAt-desc",label:"Newest First"},
        {value:"createdAt-asc",label:"Oldest First"}]

    const tableHeaders=['Name','Image','Status','Action'];
  return (
    <div className="flex flex-col gap-5">
    {/* Filters */}
    <div className='flex justify-center'>
    <FilterComponent searchTerm={searchTerm}
     setSearchTerm={setSearchTerm}
      sortBy={sortBy}
       setSortBy={setSortBy}
       contentForSortSelect={contentForSortSelect}
      setCurrentPage={setCurrentPage}/>
    </div>

    <div className="mx-5 space-y-4">
      {isFetching ? (
        <div className="flex items-center gap-2 text-sm text-neutral-500 justify-center">
          <Loader2 className="size-4 animate-spin text-rose-400" />
          <span>Fetching data...</span>
        </div>
      )
    :isError?(
        <div className="flex items-center gap-2 text-sm text-neutral-500 justify-center">
          <X className="size-4  text-rose-400" />
          <span>Fail to Fetch data</span>
        </div>
      ):(
        <>
        <TableComponent tableHeaders={tableHeaders} tableBody={communities} />
      <PaginationComponent
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      />
      </>
    )
  }
    </div>
  </div>
  )
}

export default Community
