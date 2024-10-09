import { faker } from "@faker-js/faker";
import { chance, formatDate } from "../pages/generic/basePage";

export class Contact implements ContactModel {
  title: Title;
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  contactSalutation?: string;
  dateOfBirth: string;
  phoneNumbers: PhoneNumber[];
  emailPrimary?: EmailAddress;
  emailSecondary?: EmailAddress;
  noEmailAddressReason: NoEmailAddressReason;
  mailName: string;

  constructor(data?: ContactModel) {
    const gender: "male" | "female" = Math.random() > 0.5 ? "male" : "female";
    if (gender == "male") {
      this.title = <Title>(
        ["Mr.", "Dr.", "Miss", "Rev", "Sir", "No Title"][
          Math.floor(Math.random() * 6)
        ]
      );
    } else {
      this.title = <Title>(
        ["Mrs.", "Ms.", "Dr.", "Miss", "Rev", "Lady", "No Title"][
          Math.floor(Math.random() * 7)
        ]
      );
    }
    this.firstName = faker.person.firstName(gender);
    if (chance()) {
      this.middleName = faker.person.middleName(gender);
    }
    this.lastName = faker.person.lastName();
    if (chance()) {
      this.preferredName = faker.person.firstName(gender);
    }
    this.contactSalutation = faker.person.prefix(gender);
    this.dateOfBirth = formatDate(
      faker.date.birthdate({ mode: "age", min: 18, max: 99 })
    );
    const numberOfPhones: number = Math.floor(Math.random() * 4) + 1;
    this.phoneNumbers = [];
    for (let i = 0; i < numberOfPhones; i++) {
      const optionRange = i == 0 ? 3 : 7;
      const phoneType = <PhoneType>(
        [
          "Home",
          "Mobile",
          "Work",
          "Business Fax",
          "Home Fax",
          "International",
          "Free Phone",
        ][Math.floor(Math.random() * optionRange)]
      );
      let phoneNumber: string;
      switch (phoneType) {
        case "Home":
          phoneNumber = faker.string.numeric(9);
          break;
        case "Mobile":
          phoneNumber = faker.string.numeric(11);
          break;
        case "Work":
        case "Business Fax":
        case "Home Fax":
          phoneNumber = faker.string.numeric(14);
          break;
        case "International":
          phoneNumber = faker.string.numeric(17);
          break;
        case "Free Phone":
          phoneNumber = "0" + faker.string.numeric(10);
          break;
        default:
          phoneNumber = "0";
      }

      this.phoneNumbers.push({
        type: phoneType,
        number: phoneNumber,
        isPrimary: i == 0,
        note: chance() ? makeNote() : null,
      });
    }
    const numberOfEmails = Math.floor(Math.random() * 3);
    if (numberOfEmails > 0) {
      this.emailPrimary = {
        address: faker.internet.email(),
        note: chance() ? makeNote() : null,
      };
    } else {
      this.noEmailAddressReason = <NoEmailAddressReason>(
        ["Not yet provided", "Doesn't have email", "Declined to provide"][
          Math.floor(Math.random() * 3)
        ]
      );
    }
    if (numberOfEmails > 1) {
      this.emailSecondary = {
        address: faker.internet.email(),
        note: chance() ? makeNote() : null,
      };
    }
    this.mailName = faker.person.firstName(gender);
    if (data) {
      for (const key in data) {
        this[key] = data[key];
      }
    }
  }
}

export interface ContactModel {
  title?: Title;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  contactSalutation?: string;
  dateOfBirth?: string;
  phoneNumbers?: PhoneNumber[];
  emailPrimary?: EmailAddress;
  emailSecondary?: EmailAddress;
  noEmailAddressReason?: NoEmailAddressReason;
  mailName?: string;
}

type Title =
  | "Mr."
  | "Mrs."
  | "Ms."
  | "Dr."
  | "Miss"
  | "Rev"
  | "Lady"
  | "Sir"
  | "No Title";

interface PhoneNumber {
  type: PhoneType;
  number: string;
  note?: string;
  isPrimary: boolean;
}

type PhoneType =
  | "Home"
  | "Mobile"
  | "Work"
  | "Business Fax"
  | "Home Fax"
  | "International"
  | "Free Phone";

interface EmailAddress {
  address: string;
  note?: string;
}

type NoEmailAddressReason =
  | "Not yet provided"
  | "Doesn't have email"
  | "Declined to provide";

export function makeNote() {
  return (
    faker.word.adjective() +
    " " +
    faker.word.noun() +
    " " +
    faker.word.adverb() +
    " " +
    faker.word.verb() +
    "ing"
  );
}
