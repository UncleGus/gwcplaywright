import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class PolicySummaryPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Policy Summary:/;
  sideNav = {
    workOrders: this.page.getByLabel("Work Orders", { exact: true }),
  };

  constructor(page: Page) {
    super(page);
  }
}
