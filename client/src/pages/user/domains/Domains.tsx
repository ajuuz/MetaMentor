import FilterComponent from "@/components/common/FilterComponent";
import PaginationComponent from "@/components/common/PaginationComponent";
import DomainCard from "@/components/user/DomainCard";
import { useUserGetAllDomainsQuery } from "@/hooks/tanstack/domain";
import type { DomainEntity } from "@/types/domainTypes";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Domains = () => {
  const [domains, setDomains] = useState<DomainEntity[]>();
  const [totalpages, setTotalPages] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("currentPage")) || 1
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("searchTerm") || ""
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || "name-asc"
  );
  const {
    data: allDomains,
    isError,
    error,
  } = useUserGetAllDomainsQuery(currentPage, 10, sortBy, searchTerm);

  useEffect(() => {
    if (allDomains) {
      console.log(allDomains);
      const domains = allDomains.domains || [];
      const totalPages = allDomains.totalPages;
      setTotalPages(totalPages);
      setDomains(domains);
    }
  }, [allDomains]);

  useEffect(() => {
    setSearchParams({
      currentPage: String(currentPage),
      searchTerm,
      sortBy,
    });
  }, [currentPage, searchTerm, sortBy, setSearchParams]);

  if (isError) {
    toast.error(error.message);
  }

  const contentForSortSelect = [
    { value: "name-asc", label: "Name (A → Z)" },
    { value: "name-desc", label: "Name (Z → A)" },
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
  ];
  return (
    <div className="flex flex-col gap-10 pt-10 flex-1">
      <div className="flex justify-center lg:px-50">
        <FilterComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          contentForSortSelect={contentForSortSelect}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="flex flex-col items-center gap-9 justify-center">
        {domains?.map((domain) => (
          <DomainCard domain={domain} />
        ))}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalpages}
      />
    </div>
  );
};

export default Domains;
