import { Page } from "@playwright/test";
import { PolicyCenterPage } from "../policyCenterPage";
import { CreateSubmissionNav } from "../createSubmissionNav";

export class LocationsPage extends PolicyCenterPage {
  titleText = /Guidewire PolicyCenter \(.+\) Locations/;
  createSubmissionNav = new CreateSubmissionNav(this.page);
  constructor(page: Page) {
    super(page);
  }
}
