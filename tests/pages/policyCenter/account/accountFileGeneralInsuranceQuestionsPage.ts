import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";

export class AccountFileGeneralInsuranceQuestionsPage extends PolicyCenterPage {
  titleText =
    /Guidewire PolicyCenter \(.+\) Account File General Insurance Questions/;
  editQuestionsButton = this.page.getByRole("button", {
    name: "Edit Questions",
  });
  commentsField = this.page.getByLabel("Comments");
  willProposalReplace = (yes: boolean) =>
    this.page
      .getByLabel("Will this proposal replace")
      .getByLabel(yes ? "Yes" : "No");
  madeClaimsWithOtherInsurer = (yes: boolean) =>
    this.page
      .getByLabel(
        "In the last 5 years have you made claims of any kind with another insurer?"
      )
      .getByLabel(yes ? "Yes" : "No");
  claimsDeclinedByOtherInsurer = (yes: boolean) =>
    this.page
      .getByLabel("In the last 5 years has")
      .getByLabel(yes ? "Yes" : "No");
  lossExceeding5000 = (yes: boolean) =>
    this.page
      .getByLabel(
        "In the last 5 years have you had loss or damage to property, exceeding $5,000"
      )
      .getByLabel(yes ? "Yes" : "No");
  criminalConvictions = (yes: boolean) =>
    this.page
      .getByLabel("Have you ever had any")
      .getByLabel(yes ? "Yes" : "No");
  bankruptcy = (yes: boolean) =>
    this.page
      .getByLabel("Have you ever been declared")
      .getByLabel(yes ? "Yes" : "No");
  updateButton = this.page.getByRole("button", { name: "Update" });

  constructor(page: Page) {
    super(page);
  }

  async answerAllNo() {
    await this.editQuestionsButton.click();
    await this.commentsField.fill("All no");
    await this.willProposalReplace(false).click();
    await this.madeClaimsWithOtherInsurer(false).click();
    await this.claimsDeclinedByOtherInsurer(false).click();
    await this.lossExceeding5000(false).click();
    await this.criminalConvictions(false).click();
    await this.bankruptcy(false).click();
    await this.updateButton.click();
  }
}
