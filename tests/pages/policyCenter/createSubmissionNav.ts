import { Page, Locator } from "@playwright/test";

export class CreateSubmissionNav {
  page: Page;
  backButton: Locator;
  nextButton: Locator;
  quoteButton: Locator;
  saveDraftButton: Locator;
  closeOptionsDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = this.page.getByRole("button", { name: "Back" });
    this.nextButton = this.page.getByRole("button", { name: "Next" });
    this.quoteButton = this.page.getByRole("button", { name: "Quote" });
    this.saveDraftButton = this.page.getByRole("button", {
      name: "Save Draft",
    });
    this.closeOptionsDropdown = this.page.getByRole("button", {
      name: "Close Options",
    });
  }
}
