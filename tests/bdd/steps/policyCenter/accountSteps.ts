import contactData from "../../../data/contact.json";
import addressData from "../../../data/address.json";
import { Given, When, Then } from "../../../fixtures/actionFixtures";
import { Address } from "../../../models/address";
import { Contact } from "../../../models/contact";
import { AccountType, chance } from "../../../pages/generic/basePage";

Given(
  /I start to create a new account of type (Collective Wizard|Collective|Company|Person|From Address Book)/,
  async (
    { policyCenterPage, enterAccountInformationPage },
    accountType: AccountType
  ) => {
    await policyCenterPage.headerNav.accountExpander.click();
    await policyCenterPage.headerNav.accountMenu.newAccount.click();
    await enterAccountInformationPage.applicantName.fill("Gregory Griggs");
    await enterAccountInformationPage.page.keyboard.press("Enter");
    await enterAccountInformationPage.performUnreliableAction({
      elementToClick: enterAccountInformationPage.createNewAccountButton,
      elementToLookFor:
        enterAccountInformationPage.createNewAccountMenu(accountType),
      errorMessage: "Couldn't open create new account button menu",
      timeout: 1000,
    });
    await enterAccountInformationPage.createNewAccountMenu(accountType).click();
  }
);

Given(
  /I enter contact information for (a new contact|.+)/,
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
  /I enter address information for (a new address|.+)/,
  async ({ createAccountPage }, addressPreset) => {
    let address: Address;
    switch (addressPreset) {
      case "a new address":
        address = new Address();
        break;
      default:
        const validAddresses = Object.keys(addressData);
        if (!Object.keys(addressData).includes(addressPreset)) {
          throw new Error(
            `Invalid adress: "${addressPreset}"\nValid options are ${validAddresses
              .concat(["a new address"])
              .join(" | ")}"`
          );
        } else {
          address = new Address(addressData[addressPreset]);
        }
    }
    await createAccountPage.enterAddressInformation(address);
  }
);

Given(
  /I enter account classification type of (Commercial|Lifestyle|Residential|Rural)/,
  async ({ createAccountPage }, classificationType: string) => {
    await createAccountPage.accountTypeDropdown.selectOption(
      classificationType
    );
  }
);

Given(
  "I complete all other mandatory Create Account data",
  async ({ createAccountPage, primaryActivitySearchPage }) => {
    if (chance()) {
      await createAccountPage.receiveFmgPostRadio.getByLabel("Yes").click();
      await createAccountPage.fmgPostDeliveryMethod
        .getByLabel(chance() ? "Email" : "Post")
        .click();
    } else {
      await createAccountPage.receiveFmgPostRadio.getByLabel("No").click();
    }
    await createAccountPage.newClientRadio
      .getByLabel(chance() ? "Yes" : "No")
      .click();
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

Given(
  "I am using an existing completed account",
  async ({
    policyCenterPage,
    accountSummaryPage,
    accountFileGeneralInsuranceQuestionsPage,
    globalData: global,
  }) => {
    await policyCenterPage.headerNav.accountButton.click();
    await accountSummaryPage.confirmNavigation();
    global.currentAccountNumber =
      await accountSummaryPage.accountNumberDisplay.innerText();
    if (
      (await accountSummaryPage.sideNav.questions.innerText()).includes(
        "Incomplete"
      )
    ) {
      await accountSummaryPage.sideNav.questions.click();

      await accountFileGeneralInsuranceQuestionsPage.confirmNavigation();
      await accountFileGeneralInsuranceQuestionsPage.answerAllNo();
    }
  }
);
