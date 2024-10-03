import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../../policyCenterPage";
import { Policy } from "../../../../models/policy";

export class ContentsDetailsPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Contents Details/;
  constructor(page: Page) {
    super(page);
  }

  async enterContentsDetails(policy: Policy) {
    throw new Error (`enterContentsDetails function not implemented in ${this.constructor.name}`)
  }
}
