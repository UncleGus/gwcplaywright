import { Page } from "@playwright/test";
import { BasePage } from "../generic/basePage";

export class ContactManagerBasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
