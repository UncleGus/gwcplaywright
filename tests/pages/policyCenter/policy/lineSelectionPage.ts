import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import {
  BuildingsAndContentsCoverableName,
  OtherRisksCoverableName,
  Policy,
  VehiclesAndImplementsCoverableName,
} from "../../../models/policy";
import { CreateSubmissionNav } from "../createSubmissionNav";

export class LineSelectionPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Line Selection/;
  createSubmissionNav = new CreateSubmissionNav(this.page);
  vehiclesAndImplementsLine = this.page
    .getByRole("row", { name: "Vehicles and Implements" })
    .getByLabel("EnabledEnabled");
  buildingsAndContentsLine = this.page
    .getByRole("row", { name: "Buildings and Contents" })
    .getByLabel("EnabledEnabled");
  liabilityLine = this.page
    .getByRole("row", { name: "Liability" })
    .getByLabel("EnabledEnabled");
  otherRisksLine = this.page
    .getByRole("row", { name: "Other Risks" })
    .getByLabel("EnabledEnabled");
  coverableCheckbox = (
    coverable:
      | VehiclesAndImplementsCoverableName
      | BuildingsAndContentsCoverableName
      | OtherRisksCoverableName
  ) => this.page.getByLabel(coverable);

  constructor(page: Page) {
    super(page);
  }

  async selectCoverables(policy: Policy) {
    if (policy.vehiclesAndImplementsCoverables.length) {
      await this.vehiclesAndImplementsLine.check();
      for (const coverable of policy.vehiclesAndImplementsCoverables) {
        await this.coverableCheckbox(coverable).click();
      }
    }
    if (policy.buildingsAndContentsCoverables.length) {
      await this. buildingsAndContentsLine.check();
      for (const coverable of policy.buildingsAndContentsCoverables) {
        await this.coverableCheckbox(coverable).click();
      }
    }
    if (policy.liabilityCoverable) {
      await this.liabilityLine.check();
    }
    if (policy.otherRisksCoverables.length) {
      await this.otherRisksLine.check();
      for (const coverable of policy.otherRisksCoverables) {
        await this.coverableCheckbox(coverable).click();
      }
    }
    await this.createSubmissionNav.nextButton.click();
  }
}
