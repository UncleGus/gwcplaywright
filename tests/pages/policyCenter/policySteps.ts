import { expect } from "@playwright/test";
import { Given, When, Then } from "../../fixtures";
import { MilkContents } from "../../models/milkContents";
import coverablesData from "../../data/coverables.json";
import {
  BuildingsAndContentsCoverableName,
  Policy,
  PolicyType,
  TermType,
} from "../../models/policy";
import { formatDate } from "../basePage";

Given("I have a policy", async ({ global }) => {
  global.policy = global.policy || new Policy();
});

Given(
  /the policy type is "(Renewing|Non renewing)"/,
  async ({ global }, policyType: string) => {
    global.policy.policyType = <PolicyType>policyType;
  }
);

Given(/the term type is "(Annual|Other)"/, ({ global }, termType: string) => {
  global.policy.termType = <TermType>termType;
});

Given(
  "the policy expiration date is {int} days in the future",
  async ({ global }, days: number) => {
    global.policy.transactionEffectiveDate = formatDate(
      new Date(
        new Date(new Date().setDate(new Date().getDate() + days)).setFullYear(
          new Date().getFullYear() - 1
        )
      )
    );
  }
);

Given(
  /the policy has Buildings and Contents coverable "(Buildings and Structures|Contents|Business Interruption|Contract Works)"/,
  async ({ global }, coverable: string) => {
    // for some reason, cucumber can't handle a .push() call and marks the step in the feature as undefined, but .concat() seems to work
    global.policy.buildingsAndContentsCoverables =
      global.policy.buildingsAndContentsCoverables.concat([
        <BuildingsAndContentsCoverableName>coverable,
      ]);
  }
);

Given(
  "the policy has a coverage of type {string}",
  async ({ global }, coverable: string) => {
    switch (coverable) {
      case "Milk":
        if (
          !global.policy.buildingsAndContentsCoverables.find(
            (member) => member == "Contents"
          )
        ) {
          // for some reason, cucumber can't handle a .push() call and marks the step in the feature as undefined, but .concat() seems to work
          global.policy.buildingsAndContentsCoverables =
            global.policy.buildingsAndContentsCoverables.concat(["Contents"]);
        }
        const milkData = coverablesData["milk"].find(
          (datum) => datum["farm owner in sharemilking agreement"]
        )["farm owner in sharemilking agreement"];
        global.policy.farmContentsCoverables.push(new MilkContents(milkData));
    }
  }
);

Given(
  "the policy defined in the background",
  async ({
    policyCenterPage,
    newSubmissionPage,
    global,
    policyInfoPage,
    lineSelectionPage,
    locationsPage,
    contentsPage,
    newClientCustomisedPricingEntryPage,
    quotePage,
  }) => {
    await policyCenterPage.headerNav.policyExpander.click();
    await policyCenterPage.headerNav.policyMenu.newSubmission.click();

    await newSubmissionPage.confirmNavigation();
    await newSubmissionPage.accountNumberField.fill(
      global.currentAccountNumber
    );
    await newSubmissionPage.searchButton.click();

    await policyInfoPage.confirmNavigation();
    await policyInfoPage.enterPolicyInfo(global.policy);

    await lineSelectionPage.confirmNavigation();
    await lineSelectionPage.selectCoverables(global.policy);

    await locationsPage.confirmNavigation();
    await locationsPage.createSubmissionNav.nextButton.click();

    await contentsPage.confirmNavigation();
    if (global.policy.domesticContentsCoverable) {
      await contentsPage.addContentsDropdown.click();
      await contentsPage.addContentsMenuPrimary("Domestic").hover();
      await contentsPage.addContentsMenuSecondary("Domestic Contents").click();

      // complete details here
    }
    for (const contents of global.policy.commercialContentsCoverables) {
      await contentsPage.addContentsDropdown.click();
      await contentsPage.addContentsMenuPrimary("Commercial").hover();
      await contentsPage.addContentsMenuSecondary(contents).click();

      // complete details here
    }
    for (const contents of global.policy.farmContentsCoverables) {
      await contentsPage.addContentsDropdown.click();
      await contentsPage.addContentsMenuPrimary("Farm").hover();
      const contentsDetailsPage = await contentsPage.addContents(
        contents.contentsType
      );

      await contentsDetailsPage.confirmNavigation();
      await contentsDetailsPage.enterContentsDetails(global.policy);

      await contentsPage.confirmNavigation();
      await contentsPage.sideNav.newClientCustomisedPricingEntry.click();

      await newClientCustomisedPricingEntryPage.confirmNavigation();
      if (process.env.GALAXY == "FMGNZDEV") {
        if (
          !(await newClientCustomisedPricingEntryPage.lossRatioField.inputValue())
        ) {
          await newClientCustomisedPricingEntryPage.lossRatioField.fill(
            global.policy.lossRatio.toString()
          );
        }
      }
    }

    // multiple attempts needed for existing bug
    let attempts = 5;
    while (attempts > 0)
      try {
        await newClientCustomisedPricingEntryPage.createSubmissionNav.quoteButton.click();
        await quotePage.confirmNavigation(3000);
        attempts = 0;
      } catch (error) {
        if (
          !(await newClientCustomisedPricingEntryPage.page
            .getByText("An invalid quote was")
            .isVisible())
        ) {
          throw error;
        } else {
          attempts--;
          if (attempts < 1) {
            throw new Error(
              `Too many unsuccessful attempts at creating a quote`
            );
          }
        }
      }
  }
);

When(
  "I start the batch renew process and return to the account summary",
  async ({
    quotePage,
    batchProcessInfoPage,
    policyCenterSummaryPage,
    accountSummaryPage,
    policyCenterMyActivitiesPage,
  }) => {
    await quotePage.page.keyboard.press("Alt+Shift+T");

    await batchProcessInfoPage.confirmNavigation();
    await batchProcessInfoPage.policyRenewalStartRunButton.click();

    await expect(
      batchProcessInfoPage.policyRenewalStartRunButton
    ).toBeDisabled();

    await batchProcessInfoPage.optionsButton.click();
    await batchProcessInfoPage.returnToPolicyCenterButton.click();

    switch (process.env.GALAXY) {
      case "FMGNZDEV":
        await accountSummaryPage.confirmNavigation();
        break;
      case "FMGNZQA2":
        await policyCenterMyActivitiesPage.confirmNavigation();
        break;
    }
    await policyCenterSummaryPage.headerNav.accountButton.click();
  }
);
