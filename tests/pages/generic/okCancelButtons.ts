import { Locator, Page } from "@playwright/test";

export class OkCancelButtons {
  page: Page;
  okButton: Locator;
  cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.okButton = this.page.getByRole("button", { name: "OK" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
  }
}
