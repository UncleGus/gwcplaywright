import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class PrimaryActivitySearchPage extends PolicyCenterPage {
  activitySelectButton = (rowName: string) =>
    this.page.getByRole("row", { name: rowName }).getByRole("button");

  constructor(page: Page) {
    super(page);
  }
}
