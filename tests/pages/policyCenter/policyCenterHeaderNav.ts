import { Locator, Page } from "@playwright/test";

export class PolicyCenterHeaderNav {
  page: Page;
  desktopButton: Locator;
  desktopExpander: Locator;
  desktopMenu: any;
  accountButton: Locator;
  accountExpander: Locator;
  accountMenu: any;
  policyButton: Locator;
  policyExpander: Locator;
  policyMenu: any;
  contactButton: Locator;
  contactExpander: Locator;
  reinsuranceButton: Locator;
  reinsuranceExpander: Locator;
  searchButton: Locator;
  searchExpander: Locator;
  teamButton: Locator;
  teamExpander: Locator;
  administrationButton: Locator;
  administrationExpander: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.desktopButton = this.page.getByRole("menuitem", { name: "Desktop" });
    this.desktopExpander = this.page.locator(
      "#TabBar-DesktopTab > .gw-action--expand-button > .gw-icon"
    );
    this.accountButton = this.page.getByRole("menuitem", {
      name: "Account",
      exact: true,
    });
    this.accountExpander = this.page.locator(
      "#TabBar-AccountTab > .gw-action--expand-button > .gw-icon"
    );
    this.accountMenu = {
      newAccount: this.page.getByRole("menuitem", { name: "New Account" }),
    }
    this.policyButton = this.page.getByRole("menuitem", { name: "Policy" });
    this.policyExpander = this.page.locator(
      "#TabBar-PolicyTab > .gw-action--expand-button > .gw-icon"
    );
    this.policyMenu = {
      newSubmission: this.page.getByRole("menuitem", { name: "New Submission" }),
    }
    this.contactButton = this.page.getByRole("menuitem", { name: "Contact" });
    this.contactExpander = this.page.locator(
      "#TabBar-ContactTab > .gw-action--expand-button > .gw-icon"
    );
    this.reinsuranceButton = this.page.getByRole("menuitem", {
      name: "Resinsurance",
    });
    this.reinsuranceExpander = this.page.locator(
      "#TabBar-ReinsuranceTab > .gw-action--expand-button > .gw-icon"
    );
    this.searchButton = this.page.getByRole("menuitem", { name: "Search" });
    this.searchExpander = this.page.locator(
      "#TabBar-SearchTab > .gw-action--expand-button > .gw-icon"
    );
    this.teamButton = this.page.getByRole("menuitem", { name: "Team" });
    this.teamExpander = this.page.locator(
      "#TabBar-TeamTab > .gw-action--expand-button > .gw-icon"
    );
    this.administrationButton = this.page.getByRole("menuitem", {
      name: "Administration",
    });
    this.administrationExpander = this.page.locator(
      "#TabBar-AdministrationTab > .gw-action--expand-button > .gw-icon"
    );
  }
}
