import { Locator, Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import { Contact } from "../../../models/contact";
import { Address } from "../../../models/address";

export class CreateAccountPage extends PolicyCenterPage {
  titleDropdown = this.page.locator(
    "#CreateAccount-CreateAccountScreen-CreateAccountStartDV-CreateAccountContactInputSet-Prefix select"
  );
  firstNameField = this.page.getByLabel("First Name");
  middleNameField = this.page.getByLabel("Middle Name(s)");
  noMiddleNameCheckbox = this.page.getByRole("checkbox", {
    name: "Has no middle name(s)/Unknown",
  });
  lastNameField = this.page.getByLabel("Last Name");
  preferredNameField = this.page.getByLabel("Preferred Name");
  contactSalutationField = this.page.getByLabel("Contact Salutation");
  dateOfBirthField = this.page.getByPlaceholder("DD/MM/YYYY");
  addPhoneButton = this.page.getByRole("button", { name: "Add", exact: true });
  phoneTypeDropdown = (index: number) =>
    this.page.locator(
      `select[name="CreateAccount-CreateAccountScreen-CreateAccountStartDV-CreateAccountContactInputSet-Phones_fmgLV-${index}-phoneType"]`
    );
  phoneNumberField = (index: number) =>
    this.page.locator(
      `input[name="CreateAccount-CreateAccountScreen-CreateAccountStartDV-CreateAccountContactInputSet-Phones_fmgLV-${index}-PhoneNumber"]`
    );
  phoneCheckBox = (index: number) =>
    this.page.locator(
      `#CreateAccount-CreateAccountScreen-CreateAccountStartDV-CreateAccountContactInputSet-Phones_fmgLV-${index}-_Checkbox_checkboxDiv`
    );
  phoneNoteField = (index: number) =>
    this.page.locator(
      `input[name="CreateAccount-CreateAccountScreen-CreateAccountStartDV-CreateAccountContactInputSet-Phones_fmgLV-${index}-contactNote"]`
    );
  setAsPrimaryButton = this.page.getByRole("button", {
    name: "Set As Primary",
  });
  primaryEmailAddressField = this.page
    .getByRole("row", { name: "Primary Email Address Contact" })
    .getByLabel("Email Address");
  primaryEmailNoteField = this.page
    .getByRole("row", { name: "Primary Email Address Contact" })
    .getByLabel("Contact Note");
  secondaryEmailAddressField = this.page
    .getByRole("row", { name: "Secondary Email Address" })
    .getByLabel("Email Address");
  secondaryEmailNoteField = this.page
    .getByRole("row", { name: "Secondary Email Address" })
    .getByLabel("Contact Note");
  noEmailReasonDropdown = this.page.locator(
    'select[name="CreateAccount-CreateAccountScreen-CreateAccountStartDV-CreateAccountContactInputSet-NewAccountNoEmailReasonInputSet-NoEmailReasonList"]'
  );
  mailNameField = this.page.getByLabel("Mail Name");
  careOfNameField = this.page.getByLabel("Care Of Name");
  propertyFarmNameField = this.page.getByLabel("Property/Farm Name");
  addressLine1Field = this.page.getByLabel("Address Line 1");
  addressLine2Field = this.page.getByLabel("Address Line 2");
  addressLine3Field = this.page.getByLabel("Address Line 3");
  townCityField = this.page.getByLabel("Town/City");
  postcodeField = this.page.getByLabel("Postcode", { exact: true });
  countryDropdown = this.page.getByLabel("Country");
  addressIsRuralRadio = this.page.getByLabel("Address is rural?");
  addressTypeField = this.page.getByLabel("addressType");
  addressDescriptionField = this.page.getByLabel("Address Description");
  accountTypeDropdown = this.page.locator(
    'select[name="CreateAccount-CreateAccountScreen-AccountClassificationDV-AccountFile_AccountTypeInputSet-AccountType"]'
  );
  newClientRadio = this.page.getByLabel("New Client? (Welcome Pack");
  primaryActivitySearchButton = this.page.getByLabel("Search...");
  servicedByRoleDropdown = this.page.locator(
    'select[name="CreateAccount-CreateAccountScreen-AccountServicedByDV-AccountFileServicedByInputSet-ServicedByRole"]'
  );
  opUnitDropdown = this.page.locator(
    'select[name="CreateAccount-CreateAccountScreen-AccountServicedByDV-AccountFileServicedByInputSet-OpUnit_fmg"]'
  );
  updateButton = this.page.getByRole("button", { name: "Update" });

  constructor(page: Page) {
    super(page);
  }

  /**
   * Enters contact details
   *
   * @param {Contact} contact     The contact object to enter
   * @memberof CreateAccountPage
   */
  async enterContactInformation(contact: Contact) {
    await this.titleDropdown.selectOption(contact.title);

    await this.firstNameField.fill(contact.firstName);

    if (contact.middleName) {
      await this.middleNameField.fill(contact.middleName);
    } else {
      await this.noMiddleNameCheckbox.check();
    }

    await this.lastNameField.fill(contact.lastName);

    await this.preferredNameField.fill(contact.preferredName || "");

    await this.contactSalutationField.fill(contact.contactSalutation || "");

    await this.dateOfBirthField.fill(contact.dateOfBirth);

    for (let i = 0; i < contact.phoneNumbers.length; i++) {
      if (i > 0) {
        await this.addPhoneButton.click();
      }
      await this.phoneTypeDropdown(i).selectOption(
        contact.phoneNumbers[i].type
      );
      await this.page.waitForTimeout(100);
      await this.phoneNumberField(i).pressSequentially(
        contact.phoneNumbers[i].number
      );
      await this.phoneNoteField(i).fill(contact.phoneNumbers[i].note || "");
      if (contact.phoneNumbers[i].isPrimary) {
        await this.phoneCheckBox(i).check();
        await this.setAsPrimaryButton.click();
      }
    }

    await this.primaryEmailAddressField.fill(
      contact.emailPrimary?.address || ""
    );

    await this.primaryEmailNoteField.fill(contact.emailPrimary?.note || "");

    await this.secondaryEmailAddressField.fill(
      contact.emailSecondary?.address || ""
    );

    await this.secondaryEmailNoteField.fill(contact.emailSecondary?.note || "");

    if (contact.noEmailAddressReason) {
      await this.noEmailReasonDropdown.selectOption(
        contact.noEmailAddressReason
      );
    }

    await this.mailNameField.fill(contact.mailName || "");
  }

  async enterAddressInformation(address: Address) {
    await this.careOfNameField.fill(address.careOfName || "");

    await this.propertyFarmNameField.fill(address.propertyFarmName || "");

    await this.addressLine1Field.fill(address.addressLine1);

    await this.addressLine2Field.fill(address.addressLine2 || "");

    await this.addressLine3Field.fill(address.addressLine3 || "");

    await this.townCityField.fill(address.townCity);

    await this.postcodeField.fill(address.postcode);

    address.isRural
      ? await this.addressIsRuralRadio.getByLabel("Yes").click()
      : await this.addressIsRuralRadio.getByLabel("No").click();

    await this.addressTypeField.fill(address.addressType || "");

    await this.addressDescriptionField.fill(address.addressDecription || "");
  }
}
