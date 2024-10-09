import { expect, Page } from "@playwright/test";
import users from "../../data/user.json";
import environments from "../../../config/environments.json";
import { BasePage, CenterName, User } from "./basePage";

export class LoginPage extends BasePage {
  url: string;
  usernameField = this.page.getByLabel("Username");
  passwordField = this.page.getByLabel("Password");
  loginButton = this.page.getByRole("button", { name: "Log In" });
  errorMessage = this.page.getByText("Your username or password may");

  /**
   * Creates an instance of LoginPage
   *
   * @param {Page} page           The global Playwright page object
   * @param {string} centerName   The name of the center in Insurance Suite to login to
   * @memberof LoginPage
   */
  constructor(page: Page, centerName: CenterName) {
    super(page);
    switch (centerName.toLowerCase()) {
      case "policycenter":
        this.url =
          environments[process.env.GALAXY as keyof typeof environments].PC_URL;
        break;
      case "claimcenter":
        this.url =
          environments[process.env.GALAXY as keyof typeof environments].CC_URL;
        break;
      case "billingcenter":
        this.url =
          environments[process.env.GALAXY as keyof typeof environments].BC_URL;
        break;
      case "contactmanager":
        this.url =
          environments[process.env.GALAXY as keyof typeof environments].CM_URL;
        break;
      default:
        throw new Error(
          `Invalid center name: "${centerName}"\nValid options are: "PolicyCenter" | "ClaimCenter" | "BillingCenter" | "ContactManager"`
        );
    }
  }

  /**
   * Navigates to the page's url
   *
   * @memberof LoginPage
   */
  async navigateTo() {
    await this.page.goto(this.url);
  }

  /**
   * Logs in using the specified user with password taken from environment variables for security
   *
   * @param {string} user   The user/role to look up from data/user.json
   * @memberof LoginPage
   */
  async enterCredentials(user: User) {
    // look up the credentials from data (username) and environment variables (password)
    const username = users[user.toLowerCase()];
    const password = process.env.PASSWORD || "nothing";

    // enter details into fields and submit
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async confirmErrorMessageShown() {
    await expect(this.errorMessage).toBeVisible();
  }
}
