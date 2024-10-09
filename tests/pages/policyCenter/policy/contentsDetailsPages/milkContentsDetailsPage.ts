import { Page } from "@playwright/test";
import { ContentsDetailsPage } from "./contentsDetailsPage";
import { ContentsCoverableName, Policy } from "../../../../models/policy";
import { OkCancelButtons } from "../../../generic/okCancelButtons";

export class MilkContentsDetailsPage extends ContentsDetailsPage {
  okCancelButtons = new OkCancelButtons(this.page);

  detailsTab = this.page.getByLabel("Details", { exact: true });
  coveragesTab = this.page.getByLabel("Coverages", { exact: true });
  imposedTermsTab = this.page.getByLabel("Imposed Terms", { exact: true });
  interestedPartiesTab = this.page.getByLabel("Interested Parties", {
    exact: true,
  });

  // details tab locators
  contentsIsMigratedRadio = (yes: boolean) =>
    this.page
      .getByLabel("Contents is migrated?")
      .getByLabel(yes ? "Yes" : "No");
  clientDescriptionField = this.page.getByLabel("Client description");
  typeOfOperatorDropdown = this.page.getByLabel("Type of operator");
  sharemilkingAgreementDropdown = this.page.getByLabel(
    "Sharemilking agreement"
  );
  additionalDetailsField = this.page.getByLabel("Additional details");
  locationOfMilkDropdown = this.page.getByLabel("Location of Milk");
  locationOfMilkExpander = this.page.getByLabel("options", { exact: true });
  existingLocationOption = this.page.getByLabel("Existing Location");
  newLocationOption = this.page.getByLabel("New Location");
  existingLocationAddressOption = (name: string) =>
    this.page.getByRole("menuitem", { name, includeHidden: true });
  facultativeReinsuranceRadio = (yes: boolean) =>
    this.page
      .getByLabel("Facultative Reinsurance")
      .getByLabel(yes ? "Yes" : "No");

  // coverages tab locators
  vatSizeField = this.page.getByLabel("Vat size / maximum possible");
  milkSolidsField = this.page.locator('input[name*="MilkSolids"]');
  milkPayoutField = this.page.locator('input[name*="MilkPayout"]');
  sumInsuredField = this.page.locator('input[name*="SumInsured"]');
  voluntaryExcessDropdown = this.page.getByLabel("Voluntary excess");
  imposedExcessField = this.page.locator('input[name*="ImposedExcess"]');
  nonCollectionCheckbox = this.page.getByLabel("Non-collection visibility");
  nonCollectionSumInsured = this.page.locator('input[name*="NCSumInsured"]');
  spoilageOrContaminationCheckbox = this.page.getByLabel(
    "Spoilage or Contamination visibility toggle"
  );
  naturalHazardCheckbox = this.page.getByLabel(
    "Natural Hazard (Natural Disaster) visibility toggle"
  );

  constructor(page: Page) {
    super(page);
  }

  async enterContentsDetails(policy: Policy) {
    const details = policy.farmContentsCoverables.find(
      (contents) => contents.contentsType == <ContentsCoverableName>"Milk"
    );
    await this.contentsIsMigratedRadio(details.contentsIsMigrated).click();
    if (details.clientDescription) {
      await this.clientDescriptionField.fill(details.clientDescription);  // Flaky: doesnt' always reveal the sharemilking agreement field
    }
    await this.page.waitForTimeout(250);
    await this.typeOfOperatorDropdown.selectOption(details.typeOfOperator);
    if (details.sharemilkingAgreement) {
      await this.sharemilkingAgreementDropdown.selectOption(
        details.sharemilkingAgreement
      );
    }
    await this.additionalDetailsField.fill(details.additionalDetails || "");
    await this.performUnreliableAction({
      elementToClick: this.locationOfMilkExpander,
      elementToLookFor: this.newLocationOption,
      timeout: 1000
    });
    if (details.locationOfMilk?.toLowerCase() != "new location") {
      await this.existingLocationOption.hover();
      if (details.locationOfMilk) {
        await this.existingLocationAddressOption(
          details.locationOfMilk
        ).click();
      } else {
        await this.existingLocationAddressOption("1:").click();
      }
    } else {
      await this.newLocationOption.click();
    }

    await this.coveragesTab.click();
    await this.vatSizeField.fill(details.vatSize.toString());
    if (details.milkSolids) {
      await this.milkSolidsField.fill(details.milkSolids.toString());
    }
    if (details.milkPayout) {
      await this.milkPayoutField.fill(details.milkPayout.toString());
    }
    if (details.sumInsured) {
      // TODO: this seems to be getting overwritten, probably needs some tab presses or something
      await this.sumInsuredField.fill(details.sumInsured.toString());
    }
    if (details.voluntaryExcess) {
      await this.voluntaryExcessDropdown.selectOption(details.voluntaryExcess);
    }
    if (details.nonCollection) {
      await this.performUnreliableAction({
        elementToCheck: this.nonCollectionCheckbox,
      });
    } else {
      await this.performUnreliableAction({
        elementToUncheck: this.nonCollectionCheckbox,
      });
    }
    if (details.nonCollection && details.nonCollectionSumInsured) {
      await this.nonCollectionSumInsured.fill(
        details.nonCollectionSumInsured.toString()
      );
    }
    if (details.spoilageOrContamination) {
      await this.performUnreliableAction({
        elementToCheck: this.spoilageOrContaminationCheckbox,
      });
    } else {
      await this.performUnreliableAction({
        elementToUncheck: this.spoilageOrContaminationCheckbox,
      });
    }
    if (details.naturalHazard) {
      await this.performUnreliableAction({
        elementToCheck: this.naturalHazardCheckbox,
      });
    } else {
      await this.performUnreliableAction({
        elementToUncheck: this.naturalHazardCheckbox,
      });
    }

    await this.page.keyboard.press("Tab");
    await this.performUnreliableAction({
      elementToClick: this.okCancelButtons.okButton,
      elementToLookFor: this.page.getByRole("button", { name: "Add Contents" }),
      timeout: 1000
    });
  }
}
