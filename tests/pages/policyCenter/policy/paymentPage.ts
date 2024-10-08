import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class PaymentPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Payment/;
  invoicingRadioNew = this.page.getByLabel("New", { exact: true });
  invoicingRadioExisting = this.page.getByLabel("Existing", { exact: true });
  addButton = this.page.getByRole("button", { name: "Add" });
  issuePolicyButton = this.page.getByRole("button", { name: "Issue Policy" });
  mostRecentAccountRadio = this.page.locator('div[id*="PaymentMethod_radio"]').last();

  constructor(page: Page) {
    super(page);
  }
}
