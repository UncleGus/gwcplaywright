import { expect } from "@playwright/test";
import { Given, When, Then } from "../../../fixtures";
import { MilkContents } from "../../../models/milkContents";
import {
  BuildingsAndContentsCoverableName,
  Policy,
  PolicyType,
  TermType,
} from "../../../models/policy";
import { formatDate } from "../../../pages/generic/basePage";

Given("I have a policy", async ({ globalData }) => {
  globalData.policy = globalData.policy || new Policy();
});

Given(
  /the policy type is (Renewing|Non renewing)/,
  async ({ globalData }, policyType: string) => {
    globalData.policy.policyType = <PolicyType>policyType;
  }
);

Given(/the term type is (Annual|Other)/, ({ globalData }, termType: string) => {
  globalData.policy.termType = <TermType>termType;
});

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
          !globalData.policy.buildingsAndContentsCoverables.find(
            (member) => member == "Contents"
          )
        ) {
          globalData.policy.buildingsAndContentsCoverables.push("Contents");
        }
        globalData.policy.farmContentsCoverables.push(new MilkContents());
    }
  }
);

Given("the policy defined in the background", async ({ createPolicy }) => {
  await createPolicy();
});

When(
  "I start the batch renew process and return to PolicyCenter",
  async ({ startPolicyRenewalBatchProcess }) => {
    await startPolicyRenewalBatchProcess();
  }
);

Then(
  "the policy is renewed",
  async ({
    viewPolicySummary,
    globalData,
    policySummaryPage,
    workOrdersPage,
  }) => {
    await viewPolicySummary(globalData.policy.number);
    await policySummaryPage.sideNav.workOrders.click();
    await workOrdersPage.confirmNavigation();
    await expect(async () => {
      await workOrdersPage.page.reload();
      await expect(
        await workOrdersPage.submissionStatusCell("Renewal")
      ).toBeVisible();
    }).toPass();
  }
);
