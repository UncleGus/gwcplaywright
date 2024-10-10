import { Given, When, Then } from "../../../fixtures";
import { LoginPage } from "../../../pages/generic/loginPage";
import { CenterName, User } from "../../../pages/generic/basePage";

// this can't be a fixture because it needs to take the centerName in as a parameter for the constructor
let loginPage: LoginPage;

Given(
  /the user is on the login page for (PolicyCenter|ClaimCenter|BillingCenter|ContactManager)/,
  async ({ page }, centerName: CenterName) => {
    loginPage = new LoginPage(page, centerName);
    await loginPage.navigateTo();
  }
);

When(
  /the user enters credentials for user (Super user)/,
  async ({}, user: User) => {
    await loginPage.enterCredentials(user);
  }
);

Then(
  /the user is taken to the (PolicyCenter|ClaimCenter|BillingCenter|ContactManager) dashboard/,
  async (
    {
      policyCenterSummaryPage,
      claimCenterDesktopPage,
      billingCenterDesktopPage,
      contactManagerDesktopPage,
      policyCenterMyActivitiesPage,
    },
    centerName: CenterName
  ) => {
    await waitForDashboard(
      {
        policyCenterSummaryPage,
        claimCenterDesktopPage,
        billingCenterDesktopPage,
        contactManagerDesktopPage,
        policyCenterMyActivitiesPage,
      },
      centerName
    );
  }
);

When("the user enters invalid credentials", async () => {
  await loginPage.enterCredentials("Invalid");
});

Then("the user should be shown an error message", async () => {
  await loginPage.confirmErrorMessageShown();
});

Given(
  /I am logged in to (PolicyCenter|ClaimCenter|BillingCenter|ContactManager) as (Super user)/,
  async (
    {
      page,
      policyCenterSummaryPage,
      claimCenterDesktopPage,
      billingCenterDesktopPage,
      contactManagerDesktopPage,
      policyCenterMyActivitiesPage,
    },
    centerName: CenterName,
    user: User
  ) => {
    loginPage = new LoginPage(page, centerName);
    await loginPage.navigateTo();
    await loginPage.enterCredentials(user);
    await waitForDashboard(
      {
        policyCenterSummaryPage,
        claimCenterDesktopPage,
        billingCenterDesktopPage,
        contactManagerDesktopPage,
        policyCenterMyActivitiesPage,
      },
      centerName
    );
  }
);

async function waitForDashboard(
  {
    policyCenterSummaryPage,
    claimCenterDesktopPage,
    billingCenterDesktopPage,
    contactManagerDesktopPage,
    policyCenterMyActivitiesPage,
  },
  centerName: CenterName
) {
  switch (centerName.toLowerCase()) {
    case "policycenter":
      switch (process.env.GALAXY) {
        case "FMGNZDEV":
          await policyCenterSummaryPage.confirmNavigation();
          break;
        case "FMGNZQA2":
          await policyCenterMyActivitiesPage.confirmNavigation();
          break;
      }
      break;
    case "claimcenter":
      await claimCenterDesktopPage.confirmNavigation();
      break;
    case "billingcenter":
      await billingCenterDesktopPage.confirmNavigation();
      break;
    case "contactmanager":
      await contactManagerDesktopPage.confirmNavigation();
      break;
  }
}
