import { expect, Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class MyActivitiesPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) My Activities/;
  constructor(page: Page) {
    super(page);
  }
}
