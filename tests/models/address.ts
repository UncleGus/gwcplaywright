import { faker } from "@faker-js/faker";
import postCodes from "../data/postcodes.json";
import { chance } from "../pages/basePage";

export class Address {
  careOfName: string;
  propertyFarmName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  townCity: string;
  postcode: string;
  country: string;
  isRural: boolean;
  addressType: string;
  addressDecription: string;

  constructor() {
    this.careOfName = chance() ? faker.person.fullName() : null;
    this.propertyFarmName = chance() ? faker.company.name() : null;
    this.addressLine1 = faker.location.streetAddress();
    this.addressLine2 = chance()
      ? faker.location.county() + " " + faker.location.cardinalDirection()
      : null;
    this.addressLine3 = chance() ? faker.location.county() : null;
    this.townCity = faker.location.city();
    this.postcode =
      postCodes.valid[Math.floor(Math.random() * postCodes.valid.length)];
    // country is always New Zealand, at least for now
    this.isRural = chance();
    this.addressType = chance() ? faker.word.adjective() : null;
    this.addressDecription = chance()
      ? faker.word.adjective() + " " + faker.word.noun()
      : null;
  }
}
