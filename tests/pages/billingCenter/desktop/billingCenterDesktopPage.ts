import { expect, Page } from "@playwright/test";
import { BillingCenterBasePage } from "../billingCenterBasePage";

export class BillingCenterDesktopPage extends BillingCenterBasePage {
  titleText = /Guidewire BillingCenter \(.+\) User Search/;
  constructor(page: Page) {
    super(page);
  }
}
