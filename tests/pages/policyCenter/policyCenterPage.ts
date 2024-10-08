import { Page } from "@playwright/test";
import { BasePage } from "../generic/basePage";
import { PolicyCenterHeaderNav } from "./policyCenterHeaderNav";
import { Policy } from "../../models/policy";
import { PageFixtures, test } from "../../fixtures";

export class PolicyCenterPage extends BasePage {
  headerNav = new PolicyCenterHeaderNav(this.page);

  constructor(page: Page) {
    super(page);
  }
}

