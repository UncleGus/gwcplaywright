import { expect, Locator, Page, test } from "@playwright/test";

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
    await test.step(`Confirm navigation to ${this.constructor.name}`, async () => {
      await this.page.waitForFunction(
        (matcher) => {
          const currentTitleText = document.querySelector("title").innerText;
          return currentTitleText.match(matcher);
        },
        this.titleText,
        { timeout }
      );
    });
  }

  async performUnreliableAction(actionDetails: UnreliableAction) {
    let attempts = 0;
    if (
      !(
        actionDetails.elementToClick ||
        actionDetails.elementToCheck ||
        actionDetails.elementToUncheck
      )
    ) {
      throw new Error(
        "No action to perform; must supply one of elementToClick, elementToCheck, elementToUncheck"
      );
    }
    do {
      try {
        console.log(`Attempt ${attempts + 1} at performing action`);
        if (actionDetails.elementToClick) {
          await actionDetails.elementToClick.click({
            timeout: actionDetails.timeout,
          });
        } else if (actionDetails.elementToCheck) {
          await actionDetails.elementToCheck.check({
            timeout: actionDetails.timeout,
          });
        } else if (actionDetails.elementToUncheck) {
          await actionDetails.elementToUncheck.uncheck({
            timeout: actionDetails.timeout,
          });
        }
        console.log("Checking success");
        if (actionDetails.elementToLookFor) {
          await expect(actionDetails.elementToLookFor).toBeVisible({
            timeout: actionDetails.timeout,
          });
        } else if (actionDetails.validationFunction) {
          await actionDetails.validationFunction;
        }
        console.log("Attempt successful");
        attempts = actionDetails.numberOfAttempts;
      } catch (error) {
        console.log(error.message);
        attempts++;
        if (attempts >= (actionDetails.numberOfAttempts || 3)) {
          throw new Error(actionDetails.errorMessage + "\n" + error.message);
        } else if (actionDetails.errorFunction) {
          await actionDetails.errorFunction;
        }
      }
    } while (attempts < (actionDetails.numberOfAttempts || 3));
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

export interface UnreliableAction {
  elementToClick?: Locator;
  elementToCheck?: Locator;
  elementToUncheck?: Locator;
  elementToLookFor?: Locator;
  validationFunction?: Promise<any>;
  errorFunction?: Promise<any>;
  numberOfAttempts?: number;
  errorMessage?: string;
  timeout?: number;
}
