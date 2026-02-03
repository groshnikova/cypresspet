/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage";
import {onFormLayoutsPage} from "../page-objects/formLayoutsPage"
import {onDatePickerPage} from "../page-objects/datePickerPage"

beforeEach("Open application", () => {
  cy.visit("/");
});

it("navigation test", () => {
  navigateTo.formLayoutsPage();
  navigateTo.datePickerPage();
  navigateTo.toastrPage();
  navigateTo.toolTipPage();
});

it('test with POM - parametrized Object Method', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitUsingTheGridForm('karina@karina.com', '123password', 1)
})

it.only('test with POM - parametrized Object Method: Basic Form', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitUsingBasicForm('karina@karina.com', '123password', false)
    navigateTo.datePickerPage()
    onDatePickerPage.selectCommonDatePickerDateFromToday(5)
    onDatePickerPage.selectRangePickerDateFromToday(10,30)
})
