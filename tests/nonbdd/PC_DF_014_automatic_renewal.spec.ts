import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { MilkContents } from "../models/milkContents";
import { Policy } from "../models/policy";
import { formatDate } from "../pages/generic/basePage";
import { LoginPage } from "../pages/generic/loginPage";
import { faker } from "@faker-js/faker";

test.beforeEach(
  "Log in to PolicyCenter and create a renewing policy coming up for renewal",
  async ({
    page,
    globalData,
    accountSummaryPage,
    accountFileGeneralInsuranceQuestionsPage,
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
    const loginPage = new LoginPage(page, "PolicyCenter");
    await loginPage.navigateTo();
    await loginPage.enterCredentials("Super user");

    await policyCenterPage.headerNav.accountButton.click();
    await accountSummaryPage.confirmNavigation();
    globalData.currentAccountNumber =
      await accountSummaryPage.accountNumberDisplay.innerText();
    if (
      (await accountSummaryPage.sideNav.questions.innerText()).includes(
        "Incomplete"
      )
    ) {
      await accountSummaryPage.sideNav.questions.click();

      await accountFileGeneralInsuranceQuestionsPage.confirmNavigation();
      await accountFileGeneralInsuranceQuestionsPage.answerAllNo();
    }
    globalData.policy = new Policy({
      policyType: "Renewing",
      termType: "Annual",
      transactionEffectiveDate: formatDate(
        new Date(
          new Date(new Date().setDate(new Date().getDate() + 21)).setFullYear(
            new Date().getFullYear() - 1
          )
        )
      ),
      buildingsAndContentsCoverables: ["Contents"],
      farmContentsCoverables: [new MilkContents()],
    });
    await policyCenterPage.headerNav.policyExpander.click();
    await policyCenterPage.headerNav.policyMenu.newSubmission.click();

    await newSubmissionPage.confirmNavigation();
    await newSubmissionPage.accountNumberField.fill(
      globalData.currentAccountNumber
    );
    await newSubmissionPage.searchButton.click();

    await policyInfoPage.confirmNavigation();
    await policyInfoPage.enterPolicyInfo(globalData.policy);

    await lineSelectionPage.confirmNavigation();
    await lineSelectionPage.selectCoverables(globalData.policy);

    await locationsPage.confirmNavigation();
    await locationsPage.createSubmissionNav.nextButton.click();

    await contentsPage.confirmNavigation();
    for (const contents of globalData.policy.farmContentsCoverables) {
      await contentsPage.addContentsDropdown.click();
      await contentsPage.addContentsMenuPrimary("Farm").hover();
      const contentsDetailsPage = await contentsPage.addContents(
        contents.contentsType
      );

      await contentsDetailsPage.confirmNavigation();
      await contentsDetailsPage.enterContentsDetails(globalData.policy);

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

test("Automatic renewal of policy", async () => {
  expect(true);
});
