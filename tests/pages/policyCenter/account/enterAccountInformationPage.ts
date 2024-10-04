import { Locator, Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import { AccountType } from "../../generic/basePage";

export class EnterAccountInformationPage extends PolicyCenterPage {
  applicantName = this.page.getByLabel("Name", { exact: true });
  createNewAccountButton = this.page.getByRole("button", {
    name: "Create New Account",
  });
  createNewAccountMenu = (accountType: AccountType) =>
    this.page.getByRole("menuitem", { name: accountType });

  constructor(page: Page) {
    super(page);
  }

  async expandCreateNewAccountMenu() {
    while (
      (await this.createNewAccountButton.getAttribute("aria-expanded")) !=
      "true"
    ) {
      await this.createNewAccountButton.click();
    }
  }

  async collapseCreateNewAccountMenu() {
    while (
      (await this.createNewAccountButton.getAttribute("aria-expanded")) !=
      "false"
    ) {
      await this.createNewAccountButton.click();
    }
  }
}
