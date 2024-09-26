import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class AccountSummaryPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Account Summary:/;
  constructor(page: Page) {
    super(page);
  }
}
