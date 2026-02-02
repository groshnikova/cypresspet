class NavigationPage {
  formLayoutsPage() {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
  }
  datePickerPage() {
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
  }

  toastrPage() {
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();
  }

  toolTipPage() {
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
  }
}

export const navigateTo = new NavigationPage();
