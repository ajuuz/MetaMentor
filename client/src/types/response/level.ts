import type { LevelTaskType } from "@/utils/constants";

export type LevelRes= {
  _id: string;
  name: string;
  description: string;
  taskFile: string;
  tasks: TaskRes[];
}

export type TaskRes= {
  _id: string;
  type: LevelTaskType;
  content: string;
}



//preview level dto
export type LevelPreview= {
  name: string;
  taskFile: string;
}
