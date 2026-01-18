export interface PackageDTO {
  name: string;
  features: string[]; // misal ["DASHBOARD", "CREATE_MEMBER"]
  price: number;
}

export interface PackageUpdateDTO {
  name?: string;
  features?: string[];
  price?: number;
}
