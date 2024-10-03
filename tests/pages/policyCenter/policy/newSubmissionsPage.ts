import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class NewSubmissionPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) New Submissions/
  accountNumberField = this.page.getByLabel("Account Number");
  searchButton = this.page.getByLabel("Search...");

  constructor(page: Page) {
    super(page);
  }
}
