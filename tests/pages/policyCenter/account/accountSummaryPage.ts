import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class AccountSummaryPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Account Summary:/;
  sideNav = {
    questions: this.page.getByLabel(/^Questions./),
  };
  infoBar = this.page.getByLabel("info bar");
  accountNumberDisplay = this.page.locator(
    '#AccountFile-AccountFileInfoBar-AccountNameAndNumber div[class="gw-label gw-infoValue"]'
  );
  currentAccountNumber: string;

  constructor(page: Page) {
    super(page);
  }
}