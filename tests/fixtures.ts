import { createBdd } from "playwright-bdd";
import { test as _test } from "playwright-bdd";
import { expect } from "@playwright/test";
import { CenterName, User } from "./pages/generic/basePage";
import { LoginPage } from "./pages/generic/loginPage";
import { MySummaryPage } from "./pages/policyCenter/desktop/mySummaryPage";
import { ClaimCenterDesktopPage } from "./pages/claimCenter/desktop/claimCenterDesktopPage";
import { BillingCenterDesktopPage } from "./pages/billingCenter/desktop/billingCenterDesktopPage";
import { ContactManagerDesktopPage } from "./pages/contactManager/desktop/contactManagerDesktopPage";
import { PolicyCenterPage } from "./pages/policyCenter/policyCenterPage";
import { EnterAccountInformationPage } from "./pages/policyCenter/account/enterAccountInformationPage";
import { CreateAccountPage } from "./pages/policyCenter/account/createAccountPage";
import { PrimaryActivitySearchPage } from "./pages/policyCenter/account/primaryActivitySearchPage";
import { AccountSummaryPage } from "./pages/policyCenter/account/accountSummaryPage";
import { NewSubmissionPage } from "./pages/policyCenter/policy/newSubmissionsPage";
import { PolicyInfoPage } from "./pages/policyCenter/policy/policyInfoPage";
import { Policy } from "./models/policy";
import { LineSelectionPage } from "./pages/policyCenter/policy/lineSelectionPage";
import { LocationsPage } from "./pages/policyCenter/policy/locationsPage";
import { ContentsPage } from "./pages/policyCenter/policy/contentsPage";
import { AccountFileGeneralInsuranceQuestionsPage } from "./pages/policyCenter/account/accountFileGeneralInsuranceQuestionsPage";
import { NewClientCustomisedPricingEntryPage } from "./pages/policyCenter/policy/newClientCustomisedPricingEntryPage";
import { QuotePage } from "./pages/policyCenter/policy/quotePage";
import { BatchProcessInfoPage } from "./pages/policyCenter/policy/batchProcessInfoPage";
import { MyActivitiesPage } from "./pages/policyCenter/desktop/myActivitiesPage";
import { PaymentPage } from "./pages/policyCenter/policy/paymentPage";
import { BankDetailsPage } from "./pages/policyCenter/policy/bankDetailsPage";
import { PolicyCompletedPage } from "./pages/policyCenter/policy/policyCompletedPage";
import { PolicySummaryPage } from "./pages/policyCenter/policy/policySummaryPage";
import { WorkOrdersPage } from "./pages/policyCenter/policy/workOrdersPage";

export type CustomFixtures = {
  globalData: { currentAccountNumber?: string; policy?: Policy };

  // policycenter pages
  policyCenterPage: PolicyCenterPage;
  policyCenterSummaryPage: MySummaryPage;
  policyCenterMyActivitiesPage: MyActivitiesPage;
  enterAccountInformationPage: EnterAccountInformationPage;
  createAccountPage: CreateAccountPage;
  primaryActivitySearchPage: PrimaryActivitySearchPage;
  accountSummaryPage: AccountSummaryPage;
  newSubmissionPage: NewSubmissionPage;
  policyInfoPage: PolicyInfoPage;
  lineSelectionPage: LineSelectionPage;
  locationsPage: LocationsPage;
  contentsPage: ContentsPage;
  accountFileGeneralInsuranceQuestionsPage: AccountFileGeneralInsuranceQuestionsPage;
  newClientCustomisedPricingEntryPage: NewClientCustomisedPricingEntryPage;
  quotePage: QuotePage;
  batchProcessInfoPage: BatchProcessInfoPage;
  paymentPage: PaymentPage;
  bankDetailsPage: BankDetailsPage;
  policyCompletedPage: PolicyCompletedPage;
  policySummaryPage: PolicySummaryPage;
  workOrdersPage: WorkOrdersPage;

  // claimcenter pages
  claimCenterDesktopPage: ClaimCenterDesktopPage;

  // billingcenter pages
  billingCenterDesktopPage: BillingCenterDesktopPage;

  // contactmanager pages
  contactManagerDesktopPage: ContactManagerDesktopPage;

  // functions
  loginToCenterAs: Function;
  findCompletedAccount: Function;
  createPolicy: Function;
  startPolicyRenewalBatchProcess: Function;
  viewPolicySummary: Function;
};

export const test = _test.extend<CustomFixtures>({
  globalData: async ({}, use) => {
    await use({});
  },
  policyCenterPage: async ({ page }, use) => {
    await use(new PolicyCenterPage(page));
  },
  policyCenterSummaryPage: async ({ page }, use) => {
    await use(new MySummaryPage(page));
  },
  policyCenterMyActivitiesPage: async ({ page }, use) => {
    await use(new MyActivitiesPage(page));
  },
  enterAccountInformationPage: async ({ page }, use) => {
    await use(new EnterAccountInformationPage(page));
  },
  createAccountPage: async ({ page }, use) => {
    await use(new CreateAccountPage(page));
  },
  primaryActivitySearchPage: async ({ page }, use) => {
    await use(new PrimaryActivitySearchPage(page));
  },
  accountSummaryPage: async ({ page }, use) => {
    await use(new AccountSummaryPage(page));
  },
  newSubmissionPage: async ({ page }, use) => {
    await use(new NewSubmissionPage(page));
  },
  policyInfoPage: async ({ page }, use) => {
    await use(new PolicyInfoPage(page));
  },
  lineSelectionPage: async ({ page }, use) => {
    await use(new LineSelectionPage(page));
  },
  locationsPage: async ({ page }, use) => {
    await use(new LocationsPage(page));
  },
  contentsPage: async ({ page }, use) => {
    await use(new ContentsPage(page));
  },
  accountFileGeneralInsuranceQuestionsPage: async ({ page }, use) => {
    await use(new AccountFileGeneralInsuranceQuestionsPage(page));
  },
  newClientCustomisedPricingEntryPage: async ({ page }, use) => {
    await use(new NewClientCustomisedPricingEntryPage(page));
  },
  quotePage: async ({ page }, use) => {
    await use(new QuotePage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  bankDetailsPage: async ({ page }, use) => {
    await use(new BankDetailsPage(page));
  },
  policyCompletedPage: async ({ page }, use) => {
    await use(new PolicyCompletedPage(page));
  },
  policySummaryPage: async ({ page }, use) => {
    await use(new PolicySummaryPage(page));
  },
  workOrdersPage: async ({ page }, use) => {
    await use(new WorkOrdersPage(page));
  },
  batchProcessInfoPage: async ({ page }, use) => {
    await use(new BatchProcessInfoPage(page));
  },

  claimCenterDesktopPage: async ({ page }, use) => {
    await use(new ClaimCenterDesktopPage(page));
  },
  billingCenterDesktopPage: async ({ page }, use) => {
    await use(new BillingCenterDesktopPage(page));
  },
  contactManagerDesktopPage: async ({ page }, use) => {
    await use(new ContactManagerDesktopPage(page));
  },

  loginToCenterAs: async ({ page }, use) => {
    const loginToCenterAs = async (centerName: CenterName, user: User) => {
      await _test.step(`Log in to ${centerName} as ${user}`, async () => {
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
      await _test.step("Find an account with mandatory questions completed", async () => {
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
      await _test.step("Create the policy via the UI", async () => {
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
      await _test.step("Start the policy renewal batch process", async () => {
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
      await _test.step(`View summary for policy ${policyNumber}`, async () => {
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