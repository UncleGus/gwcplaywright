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

type PageFixtures = {
  policyCenterPage: PolicyCenterPage;
  policyCenterSummaryPage: MySummaryPage;
  enterAccountInformationPage: EnterAccountInformationPage;
  createAccountPage: CreateAccountPage;
  primaryActivitySearchPage: PrimaryActivitySearchPage;
  accountSummaryPage: AccountSummaryPage;

  claimCenterDesktopPage: ClaimCenterDesktopPage;
  billingCenterDesktopPage: BillingCenterDesktopPage;
  contactManagerDesktopPage: ContactManagerDesktopPage;
};

export const test = base.extend<PageFixtures>({
  policyCenterPage: async ({ page }, use) => {
    await use(new PolicyCenterPage(page));
  },
  policyCenterSummaryPage: async ({ page }, use) => {
    await use(new MySummaryPage(page));
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
