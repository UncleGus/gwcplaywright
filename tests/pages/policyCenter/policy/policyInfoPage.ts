import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import { Policy } from "../../../models/policy";
import { CreateSubmissionNav } from "../createSubmissionNav";

export class PolicyInfoPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Policy Info/;
  createSubmissionNav = new CreateSubmissionNav(this.page);
  policyTypeDropdown = this.page.getByLabel("Policy Type");
  termTypeDropdown = this.page.getByLabel("Term Type");
  transactionEffectiveDateField = this.page
    .getByLabel("Transaction Effective Date")
    .getByPlaceholder("DD/MM/YYYY");
  soldByRoleDropdown = this.page.getByLabel("Sold By Role");
  soldByOpUnitDropdown = this.page.getByLabel("Sold By Op Unit");

  constructor(page: Page) {
    super(page);
  }

  async enterPolicyInfo(policy: Policy) {
    await this.policyTypeDropdown.selectOption(policy.policyType);
    await this.transactionEffectiveDateField.fill(
      policy.transactionEffectiveDate
    );
    await this.soldByRoleDropdown.click();
    await this.page.waitForTimeout(500);
    await this.soldByRoleDropdown.selectOption(policy.soldByRole);
    await this.soldByOpUnitDropdown.click();
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.createSubmissionNav.nextButton.click();
  }
}
