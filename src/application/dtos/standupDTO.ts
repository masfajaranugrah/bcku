export interface CreateStandupDTO {
  companyId: string;
  sprintId?: string;
  userId: string;
  yesterday: string;
  today: string;
  blockers?: string;
  date: Date;
}

export interface UpdateStandupDTO {
  yesterday?: string;
  today?: string;
  blockers?: string;
}
