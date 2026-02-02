/// <reference types="cypress" />

beforeEach("Open application", () => {
  cy.visit("/");
});

it("input fields", () => {
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();

  //regular typing
  cy.get("#exampleInputEmail1").type("karina.groshnikova@gmail.com");

  //typing with delay
  cy.get("#inputEmail1")
    .type("test@gmail.com", { delay: 200 })
    .clear()
    .type("hello")
    .clear();

  //to clear an input field

  //typing into input using the label(clear doesn't work when using the label)
  cy.contains("nb-card", "Using the Grid").contains("Email").type("helloworld");

  cy.get("#inputEmail1")
    .should("have.value", "helloworld")
    .clear()
    .type("new value")
    .press(Cypress.Keyboard.TAB);
});

it("Tap keys for inputs", () => {
  cy.contains("Auth").click();
  cy.contains("Login").click();

  cy.get("#input-email").type("test@bondaracademy.com");
  cy.get("#input-password").type("Welcome{enter}");
});

it("Radio buttons", () => {
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
  cy.contains("nb-card", "Using the Grid")
    .find('[type="radio"]')
    .then((allRadioButtons) => {
      cy.wrap(allRadioButtons)
        .eq(0)
        .check({ force: true })
        .should("be.checked");
      cy.wrap(allRadioButtons)
        .eq(1)
        .check({ force: true })
        .should("be.checked");
      cy.wrap(allRadioButtons).eq(0).should("not.be.checked");
      cy.wrap(allRadioButtons).eq(2).should("be.disabled");
    });

  cy.contains("nb-card", "Using the Grid")
    .contains("Option 1")
    .click({ force: true });
  cy.contains("nb-card", "Using the Grid")
    .contains("Option 2")
    .click({ force: true });

  cy.contains("nb-card", "Using the Grid")
    .contains("label", "Option 1")
    .find("input")
    .check({ force: true });
  cy.contains("nb-card", "Using the Grid")
    .contains("label", "Option 2")
    .find("input")
    .check({ force: true });
  cy.contains("nb-card", "Using the Grid")
    .contains("label", "Disabled Option")
    .find('input[type="radio"]')
    .should("not.be.checked");
});

it("Check boxes", () => {
  cy.contains("Modal & Overlays").click();
  cy.contains("Toastr").click();

  // State of the checkbox is always gonna be checked compared to the click command
  cy.get('[type="checkbox"]').uncheck({ force: true });

  cy.get('[type="checkbox"]').click({ force: true, multiple: true });

  cy.contains("label", "Hide on click")
    .find("input")
    .uncheck({ force: true })
    .should("not.be.checked");
});

it("Lists and Dropdowns", () => {
  //two types of Dropdowns: Native: list - options Custom: button - ul- option list
  cy.contains("Modal & Overlays").click();
  cy.contains("Toastr").click();

  //Native
  cy.contains("div", "Toast type:").find("select").select("info");
  cy.contains("div", "Toast type:")
    .find("select")
    .select("warning")
    .should("have.value", "warning");

  //Custom
  cy.contains("div", "Position:").find("nb-select").click();
  cy.get(".option-list").contains("bottom-right").click();
  cy.contains("div", "Position:")
    .find("nb-select")
    .should("have.text", "bottom-right");

  //Loop for selecting all values and checking if they work for Native
  cy.contains("div", "Position:")
    .find("nb-select")
    .then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".option-list nb-option").each((opt, index, list) => {
        cy.wrap(opt).click();
        if (index < list.length - 1) cy.wrap(dropdown).click();
      });
    });
});

it("Tooltips automation", () => {
  //Going to the location of the element that we are testing
  cy.contains("Modal & Overlays").click();
  cy.contains("Tooltip").click();

  cy.contains("button", "Top").trigger("mouseenter");
  cy.get("nb-tooltip").should("have.text", "This is a tooltip");
});

it("Dialog boxes Native to the application and Native to the browser", () => {
  cy.contains("Modal & Overlays").click();
  cy.contains("Dialog").click();

  //Native to the application
  cy.contains("button", "Enter Name").click();
  cy.get('input[placeholder="Name"]').type("Karina", { delay: 200 });
  cy.contains("button", "Submit").click();
});

it("Dialog boxes Native to the application and Native to the browser2", () => {
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();
  cy.get(".nb-trash").first().click();

  //Option 1(only when triggered)
  cy.on("window:confirm", (confirm) => {
    expect(confirm).to.equal("Are you sure you want to delete?");
  });

  //Option 2
  cy.window().then((win) => {
    cy.stub(win, "confirm").as("dialogBox").returns(true); //false if you don't want to delete
  });
  cy.get(".nb-trash").first().click();
  cy.get("@dialogBox").should(
    "be.calledWith",
    "Are you sure you want to delete?",
  );
});

it("WebTables", () => {
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();
  //option 1: by text
  cy.get("tbody")
    .contains("tr", "Larry")
    .then((tableRow) => {
      cy.wrap(tableRow).find(".nb-edit").click();
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("35");
      cy.wrap(tableRow).find(".nb-checkmark").click();
      cy.wrap(tableRow).find("td").last().should("have.text", "35");
    });

  //option 2: by index
  cy.get(".nb-plus").click();
  cy.get("thead tr")
    .eq(2)
    .then((tableRow) => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type("Karina");
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Groshnikova");
      cy.wrap(tableRow).find('[placeholder="Username"]').type("@groshni");
      cy.wrap(tableRow).find('[placeholder="E-mail"]').type("test@gmail.com");
      cy.wrap(tableRow).find('[placeholder="Age"]').type("28");
      cy.wrap(tableRow).find(".nb-checkmark").click();
    });
  cy.get("tbody tr")
    .first()
    .find("td")
    .then((tableColumns) => {
      cy.wrap(tableColumns).eq(2).should("have.text", "Karina");
      cy.wrap(tableColumns).eq(3).should("have.text", "Groshnikova");
    });
});

it("Filtering the table", () => {
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();

  cy.get('[placeholder="Age"]').type(20);
  cy.wait(500);
  cy.get("tbody tr").each((tableRows) => {
    cy.wrap(tableRows).find("td").last().should("have.text", "20");
  });
});

it("Filtering the table2", () => {
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();

  const ages = [20, 30, 40, 200];
  cy.wrap(ages).each((age) => {
    cy.get('[placeholder="Age"]').clear().type(age);
    cy.wait(500);
    cy.get("tbody tr").each((tableRows) => {
      if (age == 200) {
        cy.wrap(tableRows).should("contain.text", "No data found");
      } else {
        cy.wrap(tableRows).find("td").last().should("have.text", age);
      }
    });
  });
});

it("Datepicker", () => {
  cy.contains("Forms").click();
  cy.contains("Datepicker").click();

  function selectDateFromCurrentDay(day) {
    let date = new Date(); //java script object
    date.setDate(date.getDate() + day);
    let futureDay = date.getDate();
    let futureMonthLong = date.toLocaleDateString("en-US", { month: "long" });
    let futureMonthShort = date.toLocaleDateString("en-US", { month: "short" });
    let futureYear = date.getFullYear();
    let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`;
    cy.get("nb-calendar-view-mode")
      .invoke("text")
      .then((calendarMonthAndYear) => {
        if (
          !calendarMonthAndYear.includes(futureMonthLong) ||
          !calendarMonthAndYear.includes(futureYear)
        ) {
          cy.get('[data-name="chevron-right"]').click();
          selectDateFromCurrentDay(day);
        } else {
          cy.get(".day-cell")
            .not(".bounding-month")
            .contains(futureDay)
            .click();
        }
      })
      return dateToAssert;
  }

  //boundary month dates can be a problem sometimes, so we have to manage it with coding
  cy.get('[placeholder="Form Picker"]').then((input) => {
    cy.wrap(input).click();
    const dateToAssert = selectDateFromCurrentDay(200);
    cy.wrap(input).should("have.value", dateToAssert);
  });
});

it('Slicers', () => {
  cy.get('[tabtitle="Temperature"] circle')
  .invoke('attr', 'cx', '116.12')
  .invoke('attr', 'cy', '11.19')
  .click()

  cy.get('[class="value temperature h1"]').should('contain.text', "20")
})

it('Drag and Drop', () => {
  cy.contains('Extra Components').click()
  cy.contains('Drag & Drop').click()

  cy.get('#todo-list div').first().trigger('dragstart')
  cy.get('#drop-list').trigger('drop')
})

it('iframes', () => {
  cy.contains('Modal & Overlays').click()
  cy.contains('Dialog').click()

  cy.frameLoaded('[data-cy="esc-close-iframe"]')

  cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()

  cy.contains('Dismiss Dialog').click()

  //Option 2
  cy.enter('[data-cy="esc-close-iframe"]').then(getBody => {
    getBody().contains('Open Dialog with esc close').click()
    cy.contains('Dismiss Dialog').click()
    getBody().contains('Open Dialog without esc close').click()
    cy.contains('OK').click()
  })
})