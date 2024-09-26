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
    let contact: Contact;
    switch (contactPersona.toLowerCase()) {
      case "a new contact":
        contact = new Contact();
        break;
      default:
        const validContacts = Object.keys(contactData);
        if (!Object.keys(contactData).includes(contactPersona)) {
          throw new Error(
            `Invalid contact persona: "${contactPersona}"\nValid options are ${validContacts
              .concat(["a new contact"])
              .join(" | ")}"`
          );
        } else {
          contact = new Contact(contactData[contactPersona]);
        }
    }
    await createAccountPage.enterContactInformation(contact);
  }
);

Given(
  "I enter address information for {string}",
  async ({ createAccountPage }, addressPreset) => {
    let address: Address;
    switch (addressPreset) {
      case "a new address":
        address = new Address();
        break;
      default:
    }
    const validAddresses = Object.keys(addressData);
    if (!Object.keys(addressData).includes(addressPreset)) {
      throw new Error(
        `Invalid contact persona: "${addressPreset}"\nValid options are ${validAddresses
          .concat(["a new address"])
          .join(" | ")}"`
      );
    } else {
      address = new Address(addressData[addressPreset]);
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
