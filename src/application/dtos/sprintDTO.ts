export interface CreateSprintDTO {
  companyId: string;
  name: string;
  goal?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status?: "PLANNED" | "IN_PROGRESS" | "DONE";
  storyPoints?: number;
  progress?: number;
  createdBy: string;
}

export interface UpdateSprintDTO {
  name?: string;
  goal?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: "PLANNED" | "IN_PROGRESS" | "DONE";
  storyPoints?: number;
  progress?: number;
}
