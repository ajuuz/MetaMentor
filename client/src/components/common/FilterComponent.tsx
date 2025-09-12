import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Search, X, Filter } from "lucide-react";
import { Fragment, useMemo } from "react";

type ContentForFilterDropdown = {
  heading: string;
  contents: { value: string; label: string }[];
  selectedData: string[];
  handleSelectFilter: (heading: string, value: string) => void;
};

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  contentForSortSelect: { value: string; label: string }[];
  contentForFilterDropdown?: ContentForFilterDropdown[];
  resetFilterDropdown?: () => void;
  resetPageOnChange?: boolean;
};
const FilterComponent = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  contentForSortSelect,
  setCurrentPage,
  limit,
  setLimit,
  contentForFilterDropdown,
  resetFilterDropdown,
  resetPageOnChange = true,
}: Props) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const activeCount = useMemo(
    () =>
      contentForFilterDropdown?.reduce(
        (acc, curr) => acc + curr.selectedData.length,
        0
      ),
    [contentForFilterDropdown]
  );

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      if (resetPageOnChange) setCurrentPage(1);
    }, 800),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  return (
    <div className="w-full mx-5 rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-red-800 to-black border-b px-4 py-3 text-white">
        <h3 className="text-sm font-semibold">Filter & Sort</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 ">
        {/* Search */}
        <div className="relative flex-1  w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400 size-4" />
          <Input
            aria-label="Search domains"
            placeholder="Search domains..."
            value={localSearchTerm}
            onChange={(e) => {
              setLocalSearchTerm(e.target.value);
              debouncedSetSearchTerm(e.target.value);
            }}
            className="pl-9 h-10 rounded-lg"
          />
          {searchTerm ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        {/*  Filters Dropdown */}
        {contentForFilterDropdown && (
          <div className="flex sm:justify-center flex-1 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 rounded-lg w-full sm:w-[240px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="size-4 text-rose-400" /> Filters
                  </span>
                  {activeCount && activeCount > 0 ? (
                    <Badge variant="secondary">{activeCount}</Badge>
                  ) : null}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {contentForFilterDropdown.map((data) => (
                  <Fragment key={data.heading}>
                    <DropdownMenuLabel className="text-xs text-neutral-500">
                      {data.heading}
                    </DropdownMenuLabel>
                    {data.contents.map((content) => (
                      <DropdownMenuCheckboxItem
                        key={content.value}
                        checked={data.selectedData.includes(content.value)}
                        onCheckedChange={() => {
                          data.handleSelectFilter(data.heading, content.value);
                          if (resetPageOnChange) setCurrentPage(1);
                        }}
                      >
                        {content.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </Fragment>
                ))}

                {/* <DropdownMenuLabel className="text-xs text-neutral-500">Gender</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={localSelectedGender}
                  onValueChange={(v) => {
                    const value = v as '' | 'male' | 'female' | 'other'
                    setLocalSelectedGender(value)
                    setSelectedGender?.(value)
                    setCurrentPage(1)
                  }}
                >
                  <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="male">Male</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="female">Female</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup> */}

                <DropdownMenuSeparator />
                <div className="px-1 py-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={resetFilterDropdown}
                  >
                    Clear all
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Sort */}
        <div className="flex sm:justify-end flex-1 w-full ">
          <Select
            value={sortBy}
            onValueChange={(v) => {
              setSortBy(v);
              if (resetPageOnChange) setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-10  rounded-lg w-full sm:w-[220px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {contentForSortSelect.map((content) => (
                <SelectItem key={content.value} value={content.value}>
                  {content.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* no of pages */}
        <div className="flex sm:justify-end flex-1 w-full ">
          <Select
            value={String(limit)}
            onValueChange={(v) => {
              setLimit(Number(v));
              if (resetPageOnChange) setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-10  rounded-lg w-full sm:w-[220px]">
              <SelectValue placeholder="No of Pages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">No of Page :5</SelectItem>
              <SelectItem value="7">No of Page :7</SelectItem>
              <SelectItem value="10">No of Page :10</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
