import { IGetMentors } from "entities/modelEntities/mentor-model.entity";

export interface IGetMentorsUsecase {
  execute(
    filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[],
    isVerified: boolean,
    sortBy: string,
    searchTerm: string,
    selectedDomains: string,
    currentPage: number,
    limit: number
  ): Promise<{ items: IGetMentors[]; totalPages: number }>;
}
