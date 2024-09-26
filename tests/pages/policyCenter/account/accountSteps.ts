import contactData from "../../../data/contact.json";
import addressData from "../../../data/address.json";
import { Given, When, Then } from "../../../fixtures";
import { Address } from "../../../models/address";
import { Contact } from "../../../models/contact";
import { AccountType, chance } from "../../basePage";

Given(
  "I start to create a new account of type {string}",
  async (
    { policyCenterPage, enterAccountInformationPage },
    accountType: AccountType
  ) => {
    await policyCenterPage.headerNav.accountExpander.click();
    await policyCenterPage.headerNav.accountMenu.newAccount.click();
    await enterAccountInformationPage.applicantName.fill("Gregory Griggs");
    await enterAccountInformationPage.page.keyboard.press("Enter");
    await enterAccountInformationPage.selectFromDropdownMenu(
      enterAccountInformationPage.createNewAccountButton,
      enterAccountInformationPage.createNewAccountMenu(accountType)
    );
  }
);

Given(
  "I enter contact information for {string}",
  async ({ createAccountPage }, contactPersona: string) => {
    // create a new random contact
    let contact = new Contact();
    let useExistingContact: boolean = false;
    switch (contactPersona.toLowerCase()) {
      case "new contact":
        // use the random contact as is
        break;
      case "any contact":
        // flip a coin and either pull an existing contact or create a new one
        if (chance()) {
          useExistingContact = true;
        }
        break;
      default:
        useExistingContact = true;
    }
    if (useExistingContact) {
      const validContacts = Object.keys(contactData);
      if (Object.keys(contactData).includes(contactPersona)) {
        // use the existing persona details
        for (const key in contactData[contactPersona]) {
          contact[key] = contactData[contactPersona][key];
        }
      }
      throw new Error(
        `Invalid contact persona: "${contactPersona}"\nValid options are ${validContacts
          .concat(["New contact", "Any contact"])
          .join(" | ")}"`
      );
    }
    await createAccountPage.enterContactInformation(contact);
  }
);

Given(
  "I enter address information for {string}",
  async ({ createAccountPage }, addressPreset) => {
    let address = new Address();
    let useExistingAddress: boolean = false;
    switch (addressPreset) {
      case "new address":
        // use the random address as it is
        break;
      case "any address":
        // flip a coin and either pull an existing contact or create a new one
        if (chance()) {
          useExistingAddress = true;
        }
        break;
      default:
        useExistingAddress = true;
    }
    if (useExistingAddress) {
      const validAddresses = Object.keys(addressData);
      if (Object.keys(addressData).includes(addressPreset)) {
        // use the existing preset details
        for (const key in addressData[addressPreset]) {
          address[key] = addressData[addressPreset][key];
        }
      }
      throw new Error(
        `Invalid contact persona: "${addressPreset}"\nValid options are ${validAddresses
          .concat(["New address", "Any address"])
          .join(" | ")}"`
      );
    }
    await createAccountPage.enterAddressInformation(address);
  }
);

Given(
  "I enter account classification type of {string}",
  async ({ createAccountPage }, classificationType: string) => {
    await createAccountPage.accountTypeDropdown.selectOption(
      classificationType
    );
  }
);

Given(
  "I complete all other mandatory account information",
  async ({ createAccountPage, primaryActivitySearchPage }) => {
    chance()
      ? await createAccountPage.newClientRadio.getByLabel("Yes").click()
      : await createAccountPage.newClientRadio.getByLabel("No").click();
    await createAccountPage.primaryActivitySearchButton.click();
    await primaryActivitySearchPage
      .activitySelectButton("Abrasives mining")
      .click();
    await createAccountPage.servicedByRoleDropdown.selectOption(
      "Insurance Consultant"
    );
  }
);

When("I update the account", async ({ createAccountPage }) => {
  await createAccountPage.updateButton.click();
});

Then("I am shown the account summary", async ({ accountSummaryPage }) => {
  await accountSummaryPage.confirmNavigation();
});
