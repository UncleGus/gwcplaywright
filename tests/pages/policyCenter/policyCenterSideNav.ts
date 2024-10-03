import { Locator, Page } from "@playwright/test";

export class PolicyCenterSideNav {
  page: Page;
  questions: Locator;
  newClientCustomisedPricingEntry: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questions = this.page.getByLabel(/^Questions./);
    this.newClientCustomisedPricingEntry = this.page.getByLabel(
      "New Client Customised Pricing"
    );
  }
}
