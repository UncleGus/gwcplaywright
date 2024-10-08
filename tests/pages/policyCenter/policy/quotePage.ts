import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class QuotePage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Quote/;
  sideNav = {
    payment: this.page.getByRole("menuitem", { name: "Payment" }),
  };

  constructor(page: Page) {
    super(page);
  }
}
