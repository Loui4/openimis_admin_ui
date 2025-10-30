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
}
