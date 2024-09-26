import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class ClaimCenterBasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
