import { createBdd } from "playwright-bdd";
import { CenterName, User } from "../pages/generic/basePage";
import { LoginPage } from "../pages/generic/loginPage";
import { test1 } from "./pageFixtures";
import { expect } from "@playwright/test";

type ActionFixtures = {
  loginToCenterAs: Function;
  findCompletedAccount: Function;
  createPolicy: Function;
  startPolicyRenewalBatchProcess: Function;
  viewPolicySummary: Function;
};

export const test = test1.extend<ActionFixtures>({
  loginToCenterAs: async ({ page }, use) => {
    const loginToCenterAs = async (centerName: CenterName, user: User) => {
      await test.step(`Log in to ${centerName} as ${user}`, async () => {
        const loginPage = new LoginPage(page, centerName);
        await loginPage.navigateTo();
        await loginPage.enterCredentials(user);
      });
    };
    await use(loginToCenterAs);
  },
  findCompletedAccount: async (
    {
      policyCenterPage,
      accountSummaryPage,
      globalData,
      accountFileGeneralInsuranceQuestionsPage,
    },
    use
  ) => {
    const findCompletedAccount = async () => {
      await test.step("Find an account with mandatory questions completed", async () => {
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
      });
    };
    await use(findCompletedAccount);
  },
  createPolicy: async (
    {
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
      policyCompletedPage,
    },
    use
  ) => {
    const createPolicy = async () => {
      await test.step("Create the policy via the UI", async () => {
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
        if (globalData.policy.domesticContentsCoverable) {
          await contentsPage.addContentsDropdown.click();
          await contentsPage.addContentsMenuPrimary("Domestic").hover();
          await contentsPage
            .addContentsMenuSecondary("Domestic Contents")
            .click();

          // complete details here
        }
        for (const contents of globalData.policy.commercialContentsCoverables) {
          await contentsPage.addContentsDropdown.click();
          await contentsPage.addContentsMenuPrimary("Commercial").hover();
          await contentsPage.addContentsMenuSecondary(contents).click();

          // complete details here
        }
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
        await paymentPage.paymentMethodManual.click();
        paymentPage.page.on("dialog", (dialog) => dialog.accept());
        await paymentPage.issuePolicyButton.click();

        await policyCompletedPage.confirmNavigation();
        globalData.policy.number = await policyCompletedPage.getPolicyNumber();
      });
    };

    await use(createPolicy);
  },
  startPolicyRenewalBatchProcess: async (
    {
      page,
      batchProcessInfoPage,
      accountSummaryPage,
      policyCenterMyActivitiesPage,
    },
    use
  ) => {
    const startPolicyRenewalBatchProcess = async () => {
      await test.step("Start the policy renewal batch process", async () => {
        await page.keyboard.press("Alt+Shift+T");

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
      });
    };
    await use(startPolicyRenewalBatchProcess);
  },
  viewPolicySummary: async (
    { policyCenterPage, page, policySummaryPage },
    use
  ) => {
    const viewPolicySummary = async (policyNumber: string) => {
      await test.step(`View summary for policy ${policyNumber}`, async () => {
        await policyCenterPage.headerNav.policyExpander.click();
        await policyCenterPage.headerNav.policyMenu.policySearchField.fill(
          policyNumber
        );
        await page.keyboard.press("Enter");

        await policySummaryPage.confirmNavigation();
      });
    };
    await use(viewPolicySummary);
  },
});

export const { Given, When, Then } = createBdd(test);
