import { expect, Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class WorkOrdersPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Work Orders/;
  submissionStatusCell = (status: string) =>
    this.page.getByRole("cell", { name: status });

  constructor(page: Page) {
    super(page);
  }

  async confirmPolicyRenewal() {
    await expect(async () => {
      await this.page.reload();
      await expect(
        await this.submissionStatusCell("Renewal")
      ).toBeVisible({ timeout: 10000 });
    }).toPass({ timeout: 180000 });
  }
}
