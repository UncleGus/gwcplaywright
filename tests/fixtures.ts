import { test as base, createBdd } from "playwright-bdd";
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

export type PageFixtures = {
  globalData: { currentAccountNumber?: string; policy?: Policy };
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

  claimCenterDesktopPage: ClaimCenterDesktopPage;
  billingCenterDesktopPage: BillingCenterDesktopPage;
  contactManagerDesktopPage: ContactManagerDesktopPage;
};

export const test = base.extend<PageFixtures>({
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
});

export const { Given, When, Then } = createBdd(test);
