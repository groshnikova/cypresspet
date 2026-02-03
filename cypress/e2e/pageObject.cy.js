/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage";

beforeEach("Open application", () => {
  cy.visit("/");
});

it.only("navigation test", () => {
  navigateTo.formLayoutsPage();

  navigateTo.datePickerPage();

  navigateTo.toastrPage();

  navigateTo.toolTipPage();
});
