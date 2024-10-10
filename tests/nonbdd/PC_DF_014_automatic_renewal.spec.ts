import { test } from "../fixtures";
import { MilkContents } from "../models/milkContents";
import { Policy } from "../models/policy";
import { formatDate } from "../pages/generic/basePage";

test.beforeEach(
  "Log in to PolicyCenter and create a renewing policy coming up for renewal",
  async ({
    loginToCenterAs,
    findCompletedAccount,
    globalData,
    createPolicy,
  }) => {
    test.setTimeout(60000);
    await loginToCenterAs("PolicyCenter", "Super user");
    await findCompletedAccount();

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

    await createPolicy();
  }
);

test("DEMO-346 | Automatic renewal of policy", async ({
  startPolicyRenewalBatchProcess,
  globalData,
  viewPolicySummary,
  policySummaryPage,
  workOrdersPage,
}) => {
  test.setTimeout(300000);
  await startPolicyRenewalBatchProcess();
  await viewPolicySummary(globalData.policy.number);
  await policySummaryPage.sideNav.workOrders.click();
  await workOrdersPage.confirmNavigation();
  await workOrdersPage.confirmPolicyRenewal();
});