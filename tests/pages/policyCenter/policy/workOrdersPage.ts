import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class WorkOrdersPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Work Orders/;
  submissionStatusCell = (status: string) =>
    this.page.getByRole("cell", { name: status });

  constructor(page: Page) {
    super(page);
  }
}
