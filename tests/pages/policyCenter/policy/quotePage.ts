import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class QuotePage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Quote/;

  constructor(page: Page) {
    super(page);
  }
}
