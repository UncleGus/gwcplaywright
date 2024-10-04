import { faker } from "@faker-js/faker";
import { chance } from "../pages/generic/basePage";
import { makeNote } from "./contact";
import { ContentsCoverableName } from "./policy";
import { Contents } from "./contents";

export class MilkContents extends Contents {
  // details
  contentsType = <ContentsCoverableName>"Milk";
  contentsIsMigrated: boolean;
  clientDescription: string;
  typeOfOperator: TypeOfOperator;
  sharemilkingAgreement: SharemilkingAgreement;
  additionalDetails: string;
  locationOfMilk: string;
  facultativeReinsurance: boolean;

  // coverages
  vatSize: number;
  milkSolids: number;
  milkPayout: number;
  sumInsured: number;
  voluntaryExcess: VoluntaryExcess;
  imposedExcess: number;
  nonCollection: boolean;
  nonCollectionSumInsured: number;
  spoilageOrContamination: boolean;
  naturalHazard: boolean;

  constructor(data?: any) {
    super();
    this.contentsIsMigrated = chance();
    if (chance()) {
      this.clientDescription = faker.word.adjective() + " milk";
    }
    this.typeOfOperator = <TypeOfOperator>(
      [
        "Owner operator",
        "Owner with farm manager",
        "Farm owner in sharemilking agreement",
        "Sharemilker in sharemilking agreement",
        "Contract Milker",
      ][Math.floor(Math.random() * 5)]
    );
    this.additionalDetails = chance() ? "" : makeNote();
    this.facultativeReinsurance = chance();

    this.vatSize = 1000 * (Math.floor(Math.random() * 11) + 1);
    if (chance()) {
      this.milkSolids = Math.floor(Math.random() * 100) + 1;
    }
    if (chance()) {
      this.milkPayout = Math.floor(Math.random() * 20) + 1;
    }
    if (chance()) {
      this.sumInsured = Math.floor(Math.random() * 10000) + 500;
    }
    if (chance()) {
      this.voluntaryExcess = <VoluntaryExcess>(
        ["$500", "$1,000", "$2,000", "$5,000", "$10,000"][
          Math.floor(Math.random() * 5)
        ]
      );
    }
    if (chance()) {
      this.imposedExcess = Math.floor(Math.random() * 1000) + 1;
    }
    this.nonCollection = chance();
    if (this.nonCollection && chance()) {
      this.nonCollectionSumInsured = Math.floor(Math.random() * 1000) + 1;
    }
    this.spoilageOrContamination = chance();
    this.naturalHazard = chance();

    if (data) {
      for (const key in data) {
        this[key] = data[key];
      }
    }
    if (
      this.typeOfOperator == "Farm owner in sharemilking agreement" ||
      this.typeOfOperator == "Sharemilker in sharemilking agreement"
    ) {
      this.sharemilkingAgreement =
        this.sharemilkingAgreement ||
        <SharemilkingAgreement>(
          ["Lower order", "50/50", "Other"][Math.floor(Math.random() * 3)]
        );
    }
  }
}

export type TypeOfOperator =
  | "Owner operator"
  | "Owner with farm manager"
  | "Farm owner in sharemilking agreement"
  | "Sharemilker in sharemilking agreement"
  | "Contract Milker";

export type SharemilkingAgreement = "Lower order" | "50/50" | "Other";

export type VoluntaryExcess =
  | "$500"
  | "$1,000"
  | "$2,000"
  | "$5,000"
  | "$10,000";
