import { expect, Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class MySummaryPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) My Summary/;
  constructor(page: Page) {
    super(page);
  }
}
