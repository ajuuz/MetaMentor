import PaginationComponent from "@/components/common/PaginationComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllCommunitiesForStudentQuery } from "@/hooks/tanstack/communitry";
import type { DomainEntity } from "@/types/domainTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Communities = () => {
  const [domains, setDomains] = useState<DomainEntity[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const navigate = useNavigate();
  const {
    data: enrolledCommunities,
    isLoading,
    isError,
  } = useGetAllCommunitiesForStudentQuery(currentPage, 10);
  useEffect(() => {
    if (enrolledCommunities) {
      const { domains, totalPages } = enrolledCommunities;
      setDomains(domains);
      console.log(domains);
      setTotalPages(totalPages);
    }
  }, [enrolledCommunities]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Something went wrong. Please try again.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center py-5 gap-5">
      {domains?.map((domain) => (
        <Card
          onClick={() => navigate(`/communities/${domain._id}`)}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200 w-full max-w-md"
        >
          <CardHeader className="flex items-center gap-4">
            <img
              src={domain.image}
              alt={domain.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-lg">{domain.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {/* {new Date(domain.createdAt).toLocaleDateString()} */}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 line-clamp-3">
              {domain.description}
            </p>
          </CardContent>
        </Card>
      ))}
      <div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Communities;
