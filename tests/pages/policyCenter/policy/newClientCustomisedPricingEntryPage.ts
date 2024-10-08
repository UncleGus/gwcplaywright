import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import { CreateSubmissionNav } from "../createSubmissionNav";

export class NewClientCustomisedPricingEntryPage extends PolicyCenterPage {
  titleText =
    /Guidewire PolicyCenter \(.+\) New Client Customised Pricing Entry/;
  createSubmissionNav = new CreateSubmissionNav(this.page);
  lossRatioField = this.page.locator('input[name*="LossRatio"]');
  lossRatioReadOnly = this.page.locator('div.gw-value-readonly-wrapper')

  constructor(page: Page) {
    super(page);
  }
}
