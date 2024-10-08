import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class PolicyCompletedPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Policy Completed/;
  viewYourPolicyLink = this.page.getByRole("link", {
    name: "View your policy",
  });

  constructor(page: Page) {
    super(page);
  }

  async getPolicyNumber() {
    const linkText = await this.viewYourPolicyLink.innerText();
    return linkText.match(/\d+/)[0];
  }
}
