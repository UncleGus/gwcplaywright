import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import { CreateSubmissionNav } from "../createSubmissionNav";
import { ContentsCoverableName } from "../../../models/policy";
import { MilkContentsDetailsPage } from "./contentsDetailsPages/milkContentsDetailsPage";

export class ContentsPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Contents$/;
  sideNav = {
    newClientCustomisedPricingEntry: this.page.getByRole("menuitem", {
      name: "New Client Customised Pricing",
    }),
  };
  createSubmissionNav = new CreateSubmissionNav(this.page);
  addContentsDropdown = this.page.getByRole("button", { name: "Add Contents" });
  addContentsMenuPrimary = (menuOption: "Domestic" | "Commercial" | "Farm") =>
    this.page.getByRole("menuitem", { name: menuOption, exact: true });
  addContentsMenuSecondary = (menuOption: ContentsCoverableName) =>
    this.page.getByLabel(<string>menuOption, { exact: true });

  constructor(page: Page) {
    super(page);
  }

  async addContents(coverable: ContentsCoverableName) {
    await this.addContentsMenuSecondary(coverable).click();
    switch (<string>coverable) {
      case "Milk":
        return new MilkContentsDetailsPage(this.page);
    }
    throw new Error(
      `Page object model not yet implemented for ${coverable}ContentsDetailsPage`
    );
  }
}
