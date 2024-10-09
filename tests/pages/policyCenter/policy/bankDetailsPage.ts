import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import bankAccountNumbers from "../../../data/bankAccounts.json";

export class BankDetailsPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Bank Details/;
  bankAccountNameField = this.page.getByLabel("Bank account name");
  bankAccountNumberField = this.page.getByPlaceholder("##-####-#######-###");
  bankAccountBranchField = this.page.locator('input[name*="BankBranch"]');
  updateButton = this.page.getByRole("button", { name: "Update" });

  constructor(page: Page) {
    super(page);
  }

  async enterBankAccountNumber(accountNumber?: string) {
    await this.bankAccountNumberField.pressSequentially(
      accountNumber || getRandomBankAccount()
    );
  }
}

function getRandomBankAccount() {
  const banks = Object.keys(bankAccountNumbers);
  const chosenBankName = banks[Math.floor(Math.random() * banks.length)];
  const chosenBank = bankAccountNumbers[chosenBankName];
  return chosenBank[Math.floor(Math.random() * chosenBank.length)];
}
