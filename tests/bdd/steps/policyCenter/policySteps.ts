import { expect } from "@playwright/test";
import { Given, When, Then } from "../../../fixtures";
import { MilkContents } from "../../../models/milkContents";
import coverablesData from "../../../data/coverables.json";
import {
  BuildingsAndContentsCoverableName,
  Policy,
  PolicyType,
  TermType,
} from "../../../models/policy";
import { formatDate } from "../../../pages/generic/basePage";
import { faker } from "@faker-js/faker";

Given("I have a policy", async ({ globalData }) => {
  globalData.policy = globalData.policy || new Policy();
});

Given(
  /the policy type is (Renewing|Non renewing)/,
  async ({ globalData }, policyType: string) => {
    globalData.policy.policyType = <PolicyType>policyType;
  }
);

Given(
  /the term type is (Annual|Other)/,
  ({ globalData }, termType: string) => {
    globalData.policy.termType = <TermType>termType;
  }
);

Given(
  /the policy expiration date is (\d+) days in the future/,
  async ({ globalData }, days: number) => {
    globalData.policy.transactionEffectiveDate = formatDate(
      new Date(
        new Date(new Date().setDate(new Date().getDate() + days)).setFullYear(
          new Date().getFullYear() - 1
        )
      )
    );
  }
);

Given(
  /the policy has Buildings and Contents coverable (Buildings and Structures|Contents|Business Interruption|Contract Works)/,
  async ({ globalData }, coverable: string) => {
    // for some reason, cucumber can't handle a .push() call and marks the step in the feature as undefined, but .concat() seems to work
    globalData.policy.buildingsAndContentsCoverables.push(
      <BuildingsAndContentsCoverableName>coverable
    );
  }
);
Given(
  /the policy has a coverage of type (General Farm Contents|Milk|Refrigerated Goods|Baled Hay|Harvested farm produce intended for sale|Baled Wool|Deer Velvet|Beehives|Drones)/,
  async ({ globalData }, coverable: string) => {
    switch (coverable) {
      case "Milk":
        if (
          !global.policy.buildingsAndContentsCoverables.find(
            (member) => member == "Contents"
          )
        ) {
          globalData.policy.buildingsAndContentsCoverables.push("Contents");
        }
        globalData.policy.farmContentsCoverables.push(new MilkContents());
    }
  }
);

Given(
  "the policy defined in the background",
  async ({
    globalData,
    policyCenterPage,
    newSubmissionPage,
    policyInfoPage,
    lineSelectionPage,
    locationsPage,
    contentsPage,
    newClientCustomisedPricingEntryPage,
    quotePage,
    paymentPage,
    bankDetailsPage,
    policyCompletedPage,
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
      if (
        (await newClientCustomisedPricingEntryPage.lossRatioReadOnly.isVisible()) ||
        (await newClientCustomisedPricingEntryPage.lossRatioField.inputValue())
      ) {
        // loss ratio is already present
      } else {
        await newClientCustomisedPricingEntryPage.lossRatioField.fill(
          globalData.policy.lossRatio.toString()
        );
      }
    }

    await newClientCustomisedPricingEntryPage.performUnreliableAction({
      elementToClick:
        newClientCustomisedPricingEntryPage.createSubmissionNav.quoteButton,
      validationFunction: quotePage.confirmNavigation(3000),
      numberOfAttempts: 5,
    });

    await quotePage.sideNav.payment.click();

    await paymentPage.confirmNavigation();
    await paymentPage.invoicingRadioNew.click();
    await paymentPage.addButton.click();

    await bankDetailsPage.confirmNavigation();
    await bankDetailsPage.bankAccountNameField.fill(
      faker.person.firstName() + " " + faker.person.lastName()
    );
    await bankDetailsPage.enterBankAccountNumber();
    await bankDetailsPage.updateButton.click();

    await paymentPage.confirmNavigation();
    await expect(async () => {
      await paymentPage.page.reload();
      await paymentPage.mostRecentAccountRadio.click();
    }).toPass();
    // await paymentPage.performUnreliableAction({
    //   elementToClick: paymentPage.mostRecentAccountRadio,
    //   errorFunction: paymentPage.page.reload(),
    //   timeout: 1000,
    // });
    paymentPage.page.on("dialog", (dialog) => dialog.accept());
    await paymentPage.issuePolicyButton.click();

    await policyCompletedPage.confirmNavigation();
    globalData.policy.number = await policyCompletedPage.getPolicyNumber();
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

Then("the policy is renewed", () => {
  // Write code here that turns the phrase above into concrete actions
});
