export interface Product {
  ProductCode: string;
  ProductName: string;
  Region: string;
  District: string;
  NumberOfServices: number;
  MemberCount: number;
}

export interface PriceList {
  PLServiceID: number;
  PLServName: string;
  DatePL: Date;
  NumberOfServices: number;
  Services: MedicalService[]
}

export interface MedicalService {
  ServiceID: number;
  ServiceUUID: string;
  ServCode: string;
  ServName: string;
  ServType: string;
  ServLevel: string;
  ServPrice: number;
  ServCareType: string;
  ServFrequency?: number;
  ServPatCat: number;
  ValidityFrom: string;
  ValidityTo?: string | null;
  AuditUserID: number;
  MaximumAmount?: number;
  manualPrice: boolean;
  ServPackageType: string;
  ServCategory?: string;
  LegacyID?: number;
}
