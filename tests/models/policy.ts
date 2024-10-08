import "dotenv/config";
import environments from "../../config/environments.json";
import { MilkContents } from "./milkContents";

export class Policy {
  number: string;
  policyType: PolicyType;
  termType: TermType;
  transactionEffectiveDate: string;
  soldByRole: SoldByRole;
  vehiclesAndImplementsCoverables: VehiclesAndImplementsCoverableName[] = [];
  buildingsAndContentsCoverables: BuildingsAndContentsCoverableName[] = [];
  liabilityCoverable: boolean;
  otherRisksCoverables: OtherRisksCoverableName[] = [];
  domesticContentsCoverable: boolean;
  commercialContentsCoverables: CommercialContentsCoverable[] = [];
  farmContentsCoverables: FarmContentsCoverable[] = [];
  lossRatio: number;

  constructor(data?: any) {
    const validSoldByOptions = environments[process.env.GALAXY].soldBy;
    this.soldByRole = <SoldByRole>(
      validSoldByOptions[Math.floor(Math.random() * validSoldByOptions.length)]
    );
    this.lossRatio = Math.floor(Math.random() * 20) + 1;
    if (data) {
      for (const key in data) {
        this[key] = data[key];
      }
    }
  }
}

export type PolicyType = "Renewing" | "Non renewing";

export type TermType = "Annual" | "Other";

export type SoldByRole =
  | "Client Servicing Consultant"
  | "Commercial Consultant"
  | "Commercial Insurance Consultant"
  | "Commercial Manager"
  | "Corporate Account Manager"
  | "Equine Insurance Consultant"
  | "Inbound Consultant"
  | "Insurance Consultant"
  | "Mobile Rural Consultant"
  | "NSSC Consultant"
  | "Rural Acquisition Consultant"
  | "Rural Consultant"
  | "Rural Manager"
  | "Senior Commercial Manager"
  | "Senior Rural Manager"
  | "Business Development Manager";

export type VehiclesAndImplementsCoverableName =
  | "Vehicles and Implements"
  | "Watercraft"
  | "Hired-in (blanket)"
  | "Fleet"
  | "Demonstration";

export type BuildingsAndContentsCoverableName =
  | "Buildings and Structures"
  | "Contents"
  | "Business Interruption"
  | "Contract Works";

export type OtherRisksCoverableName =
  | "Animals"
  | "Forestry (Plantations)"
  | "Special Risks"
  | "Outsourced Risks";

export type CommercialContentsCoverableName =
  | "General Commercial Contents"
  | "Stock"
  | "Portable Plant and Equipment"
  | "Refrigerated Goods"
  | "Goods in Transit"
  | "Money"
  | "Breakdown";

export type CommercialContentsCoverable = any;

export type FarmContentsCoverableName =
  | "General Farm Contents"
  | "Milk"
  | "Refrigerated Goods"
  | "Baled Hay"
  | "Harvested farm produce intended for sale"
  | "Baled Wool"
  | "Deer Velvet"
  | "Beehives"
  | "Drones";

// export enum FarmContentsCoverableName { // I can't remember why I turned this into an enum, I was experimenting with something
//   "General Farm Contents",
//   "Milk",
//   "Refrigerated Goods",
//   "Baled Hay",
//   "Harvested farm produce intended for sale",
//   "Baled Wool",
//   "Deer Velvet",
//   "Beehives",
//   "Drones",
// }

export type FarmContentsCoverable = MilkContents;

export type ContentsCoverableName =
  | "Domestic Contents"
  | CommercialContentsCoverableName
  | FarmContentsCoverableName;
