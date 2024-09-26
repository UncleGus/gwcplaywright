import { expect, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { PolicyCenterHeaderNav } from "./headerNav";

export class PolicyCenterPage extends BasePage {
  headerNav = new PolicyCenterHeaderNav(this.page);
  sideNav: any;
  constructor(page: Page) {
    super(page);
  }
}
