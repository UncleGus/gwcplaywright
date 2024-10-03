import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class BatchProcessInfoPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Batch Process Info/;
  optionsButton = this.page.getByLabel("settings");
  returnToPolicyCenterButton = this.page
    .getByLabel("title and toolbar")
    .getByLabel("Return to PolicyCenter");
  policyRenewalStartRunButton = this.page.locator(
    "#BatchProcessInfo-BatchProcessScreen-BatchProcessesLV-59-RunBatchWithoutNotify"
  );

  constructor(page: Page) {
    super(page);
  }
}
