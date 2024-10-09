import { Page } from "@playwright/test";
import { BasePage } from "../generic/basePage";
import { PolicyCenterHeaderNav } from "./policyCenterHeaderNav";

export class PolicyCenterPage extends BasePage {
  headerNav = new PolicyCenterHeaderNav(this.page);

  constructor(page: Page) {
    super(page);
  }
}
