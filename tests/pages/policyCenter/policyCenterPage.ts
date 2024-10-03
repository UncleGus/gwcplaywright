import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { PolicyCenterHeaderNav } from "./policyCenterHeaderNav";
import { PolicyCenterSideNav } from "./policyCenterSideNav";

export class PolicyCenterPage extends BasePage {
  headerNav = new PolicyCenterHeaderNav(this.page);
  sideNav = new PolicyCenterSideNav(this.page);
  constructor(page: Page) {
    super(page);
  }
}
