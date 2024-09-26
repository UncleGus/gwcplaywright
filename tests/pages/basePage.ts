import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  page: Page;
  titleText: string | RegExp;

  /**
   * Creates an instance of BasePage.
   * @param {Page} page           The global Playwright page object
   * @param {string} centerName   The name of the center in Insurance Suite to login to
   * @memberof BasePage
   */
  constructor(page: Page) {
    this.page = page;
  }

  async confirmNavigation() {
    await this.page.waitForFunction((matcher) => {
      const currentTitleText = document.querySelector("title").innerText;
      return currentTitleText.match(matcher);
    }, this.titleText);
  }

  async selectFromDropdownMenu(
    dropdownElement: Locator,
    optionElement: Locator
  ) {
    while ((await dropdownElement.getAttribute("aria-expanded")) != "true") {
      await dropdownElement.click();
      await this.page.waitForTimeout(100);
    }
    await optionElement.click();
    while ((await dropdownElement.getAttribute("aria-expanded")) != "false") {
      await dropdownElement.click();
    }
  }
}

export type CenterName =
  | "PolicyCenter"
  | "ClaimCenter"
  | "BillingCenter"
  | "ContactManager";
export type User = "Super user" | "Invalid";
export type AccountType = "Person";

export function chance(probability: number = 0.5) {
  return Math.random() < probability;
}
