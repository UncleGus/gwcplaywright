import { expect, Locator, Page } from "@playwright/test";
import { ClaimCenterBasePage } from "../claimCenterBasePage";

export class ClaimCenterDesktopPage extends ClaimCenterBasePage {
  titleText = /Guidewire ClaimCenter \(.+\) Activities/;
  constructor(page: Page) {
    super(page);
  }
}
