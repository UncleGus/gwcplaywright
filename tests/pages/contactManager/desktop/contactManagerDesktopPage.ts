import { Page } from "@playwright/test";
import { ContactManagerBasePage } from "../contactManagerBasePage";

export class ContactManagerDesktopPage extends ContactManagerBasePage {
  titleText = /Guidewire ContactManager \(.+\) Search/;
  constructor(page: Page) {
    super(page);
  }
}
