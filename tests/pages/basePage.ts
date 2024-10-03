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

  async confirmNavigation(timeout?: number) {
    await this.page.waitForFunction(
      (matcher) => {
        const currentTitleText = document.querySelector("title").innerText;
        return currentTitleText.match(matcher);
      },
      this.titleText,
      { timeout }
    );
  }

  async openUnreliableDropown(
    dropdownElement: Locator,
    revealedElement: Locator
  ) {
    let attempts = 0;
    while (!(await revealedElement.isVisible()) && attempts < 5) {
      await dropdownElement.click();
      await this.page.waitForTimeout(100);
      attempts++;
    }
    if (attempts > 4) {
      throw new Error(
        `Made ${attempts} attempts at clicking this dropdown without success`
      );
    }
  }

  async setCheckboxWithResilience(element: Locator, checked: boolean) {
    let attempts = 3;
    while (attempts > 0) {
      try {
        checked ? await element.check() : await element.uncheck();
        attempts = 0;
      } catch (error) {
        if (
          error.message.includes(
            "Clicking the checkbox did not change its state"
          )
        ) {
          attempts--;
          if (attempts < 1) {
            throw new Error(
              "Too many unsuccessful attempts at clicking the checkbox"
            );
          }
        } else {
          throw error;
        }
      }
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

export function formatDate(date: Date) {
  return (
    ("0" + date.getDate().toString()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1).toString()).slice(-2) +
    "/" +
    date.getFullYear()
  );
}
