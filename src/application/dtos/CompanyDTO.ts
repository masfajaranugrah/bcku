export interface CreateCompanyDTO {
  name: string;
  code?: string | null;
  paketId?: string | null;
  address?: string | null;
  phone?: string | null;
}

export interface UpdateCompanyDTO {
  name?: string;
  code?: string | null;
  paketId?: string | null;
  address?: string | null;
  phone?: string | null;
  isActive?: boolean;
}
