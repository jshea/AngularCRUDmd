/*
 * Test the UI for the AngularCRUD application
 */

/* global browser, by, element, expect */

describe("AngularCRUD", function() {

   /*
    * These optional functions run before and after this test suite. Use then to setup
    * (initialize data) and teardown (clean up after ourselves) for this full test suite.
    */
   // beforeAll(function() {});
   // afterAll(function() {});

   /*
    *  Setup - this runs before each test (each it()). This calls
    *  the load url so each test starts at the same place with the
    *  same initial data.
    */
   beforeEach(function() {
      // Our URL is prefixed with baseUrl from config.js
      browser.get("angularcrud/#/load");
   });

   /*
    *  Tear-down - runs after each test
    */
   afterEach(function() {});


   /*
    * Check that we are starting at the list screen and we have
    * the expected initial test data.
    */
   it ("should load the list view", function() {
      // Elements
      var listTable = element(by.id("listTable"));

      // Check if all elements are present
      expect(listTable.isPresent()).toBe(true);
   });


   /*
    * Confirm the initial list screen is loading properly.
    */
   it ("should have a list view with the correct 5 elements", function() {
      // Count the number of rows in the table
      var rows = element.all(by.repeater("person in $data"));

      // The table should have 5 data rows
      expect(rows.count()).toBe(5);

      // Check that the names are equal to our test data
      expect(rows.get(0).element(by.id("cellLastName")) .getText()).toBe("Butt");
      expect(rows.get(0).element(by.id("cellFirstName")).getText()).toBe("James");
      expect(rows.get(1).element(by.id("cellLastName")) .getText()).toBe("Darakjy");
      expect(rows.get(1).element(by.id("cellFirstName")).getText()).toBe("Josephine");
      expect(rows.get(2).element(by.id("cellLastName")) .getText()).toBe("Foller");
      expect(rows.get(2).element(by.id("cellFirstName")).getText()).toBe("Donette");
      expect(rows.get(3).element(by.id("cellLastName")) .getText()).toBe("Paprocki");
      expect(rows.get(3).element(by.id("cellFirstName")).getText()).toBe("Lenna");
      expect(rows.get(4).element(by.id("cellLastName")) .getText()).toBe("Venere");
      expect(rows.get(4).element(by.id("cellFirstName")).getText()).toBe("Art");
   });


   /*
    * From the initial list screen test that we can click on a person
    * and load their data in the view screen.
    */
   it ("should view a contact", function() {
      // Rows will contain the dynamically created table rows
      var rows = element.all(by.repeater("person in $data"));

      // Load view screen for our first contact
      rows.first().element(by.id("cellLastName")).element(by.id("cellLastNameLink")).click();

      // View screen elements
      var firstName = element(by.id("firstName"));
      var lastName = element(by.id("lastName"));
      var street = element(by.id("street"));
      var city = element(by.id("city"));
      var state = element(by.id("state"));
      var zip = element(by.id("zip"));
      var homePhone = element(by.id("homePhone"));
      var mobile = element(by.id("mobile"));
      var email = element(by.id("email"));
      var website = element(by.id("website"));
      var btnEdit = element(by.id("btnEdit"));
      var btnDelete = element(by.id("btnDelete"));

      // Verify they are all present
      expect(firstName.isPresent()).toBe(true);
      expect(lastName.isPresent()).toBe(true);
      expect(street.isPresent()).toBe(true);
      expect(city.isPresent()).toBe(true);
      expect(state.isPresent()).toBe(true);
      expect(zip.isPresent()).toBe(true);
      expect(homePhone.isPresent()).toBe(true);
      expect(mobile.isPresent()).toBe(true);
      expect(email.isPresent()).toBe(true);
      expect(website.isPresent()).toBe(true);
      expect(btnEdit.isPresent()).toBe(true);
      expect(btnDelete.isPresent()).toBe(true);

      /*
       * Verify they all have the correct value - note
       * the values are dependent on the test data.
       */
      expect(firstName.getText()).toBe("James");
      expect(lastName.getText()).toBe("Butt");
      expect(street.getText()).toBe("6649 N Blue Gum St");
      expect(city.getText()).toBe("New Orleans");
      expect(state.getText()).toBe("LA");
      expect(zip.getText()).toBe("70116");
      expect(homePhone.getText()).toBe("5046218927");
      expect(mobile.getText()).toBe("5048451427");
      expect(email.getText()).toBe("jbutt@gmail.com");
      expect(website.getText()).toBe("http://bentonjohnbjrcom");
      expect(btnEdit.getText()).toBe("Edit");
      expect(btnDelete.getText()).toBe("Delete");
   });


   /*
    * Test that the view screen edit button takes us to the edit
    * screen, the edit screen has the correct initial values.
    */
   it ("should show a edit screen", function() {
      // Rows will contain the dynamically created table rows
      var rows = element.all(by.repeater("person in $data"));

      // Load view screen for our first contact
      rows.first().element(by.id("cellLastName")).element(by.id("cellLastNameLink")).click();

      // Click the edit button to load the edit screen
      element(by.id("btnEdit")).click();

      // Get a handle to the edit screen elements
      var firstName = element(by.id("firstName"));
      var lastName = element(by.id("lastName"));
      var street = element(by.id("street"));
      var city = element(by.id("city"));
      var state = element(by.id("state"));
      var zip = element(by.id("zip"));
      var homePhone = element(by.id("homePhone"));
      var mobile = element(by.id("mobile"));
      var email = element(by.id("email"));
      var website = element(by.id("website"));
      var btnSave = element(by.id("btnSave"));
      var btnDelete = element(by.id("btnDelete"));

      // Verify they are all present
      expect(firstName.isPresent()).toBe(true);
      expect(lastName.isPresent()).toBe(true);
      expect(street.isPresent()).toBe(true);
      expect(city.isPresent()).toBe(true);
      expect(state.isPresent()).toBe(true);
      expect(zip.isPresent()).toBe(true);
      expect(homePhone.isPresent()).toBe(true);
      expect(mobile.isPresent()).toBe(true);
      expect(email.isPresent()).toBe(true);
      expect(website.isPresent()).toBe(true);
      expect(btnSave.isPresent()).toBe(true);
      expect(btnDelete.isPresent()).toBe(true);

      // Verify they all have the correct value - note
      // the values are dependent on the test data.
      // NOTE: https://github.com/angular/protractor/blob/master/docs/faq.md#the-result-of-gettext-from-an-input-element-is-always-empty
      expect(firstName.getAttribute('value')).toBe("James");
      expect(lastName.getAttribute('value')).toBe("Butt");
      expect(street.getAttribute('value')).toBe("6649 N Blue Gum St");
      expect(city.getAttribute('value')).toBe("New Orleans");
      expect(state.getAttribute('value')).toBe("LA");
      expect(zip.getAttribute('value')).toBe("70116");
      expect(homePhone.getAttribute('value')).toBe("5046218927");
      expect(mobile.getAttribute('value')).toBe("5048451427");
      expect(email.getAttribute('value')).toBe("jbutt@gmail.com");
      expect(website.getAttribute('value')).toBe("http://bentonjohnbjrcom");
      expect(btnSave.getText()).toBe("Save");
      expect(btnDelete.getText()).toBe("Delete");
   });


   /*
    * Change the values for a person
    */
   it ("should edit a contact", function() {
      // Rows will contain the dynamically created table rows
      var rows = element.all(by.repeater("person in $data"));

      // Load view screen for our first contact
      rows.first().element(by.id("cellLastName")).element(by.id("cellLastNameLink")).click();

      // Click the edit button to load the edit screen
      element(by.id("btnEdit")).click();

      // Change the form values
      element(by.id("firstName")).clear().sendKeys("Jim");
      element(by.id("lastName")).clear().sendKeys("Shea");
      element(by.id("street")).clear().sendKeys("4800 Oak Grove Dr");
      element(by.id("city")).clear().sendKeys("Pasadena");
      element(by.id("state")).clear().sendKeys("CA");
      element(by.id("zip")).clear().sendKeys("91109");
      element(by.id("homePhone")).clear().sendKeys("8183547751");
      element(by.id("mobile")).clear().sendKeys("8185551212");
      element(by.id("email")).clear().sendKeys("jshea@jpl.nasa.gov");
      element(by.id("website")).clear().sendKeys("http://wwwebiscom"); // DB saving with no .'s.

      // Save
      element(by.id("btnSave")).click();

      // Validate we're on the view screen
      expect(browser.getCurrentUrl()).toContain('#/view/');

      // View screen elements
      var firstName = element(by.id("firstName"));
      var lastName = element(by.id("lastName"));
      var street = element(by.id("street"));
      var city = element(by.id("city"));
      var state = element(by.id("state"));
      var zip = element(by.id("zip"));
      var homePhone = element(by.id("homePhone"));
      var mobile = element(by.id("mobile"));
      var email = element(by.id("email"));
      var website = element(by.id("website"));
      var btnEdit = element(by.id("btnEdit"));
      var btnDelete = element(by.id("btnDelete"));

      // Validate the expected values are present
      expect(firstName.getText()).toBe("Jim");
      expect(lastName.getText()).toBe("Shea");
      expect(street.getText()).toBe("4800 Oak Grove Dr");
      expect(city.getText()).toBe("Pasadena");
      expect(state.getText()).toBe("CA");
      expect(zip.getText()).toBe("91109");
      expect(homePhone.getText()).toBe("8183547751");
      expect(mobile.getText()).toBe("8185551212");
      expect(email.getText()).toBe("jshea@jpl.nasa.gov");
      expect(website.getText()).toBe("http://wwwebiscom");
      expect(btnEdit.getText()).toBe("Edit");
      expect(btnDelete.getText()).toBe("Delete");
   });


   /*
    * Delete a person - From the view screen
    */
   it ("should delete a contact from the view screen", function() {

      // Rows will contain the dynamically created table rows
      var rows = element.all(by.repeater("person in $data"));

      // Grab the first contacts last name, and load view screen for them.
      var lastName;
      rows.first().element(by.id("cellLastName")).element(by.id("cellLastNameLink")).getText().then(function(text) {
         lastName = text;
      });
      rows.first().element(by.id("cellLastName")).element(by.id("cellLastNameLink")).click();

      // Make sure delete button is present.
      var btnDelete = element(by.id("btnDelete"));
      expect(btnDelete.isPresent()).toBe(true);

      // Click Delete.
      element(by.id("btnDelete")).click();

      // Verify we're back to the list.
      expect(browser.getCurrentUrl()).toContain('#/list');

      // Verify the contact isn't in the list.
      rows = element.all(by.repeater("person in $data")).all(by.id("cellLastName"));
      expect(rows.getText()).not.toContain(lastName);
   });


   /*
    * Delete a person - From the edit screen
    */
   it ("should delete a contact from the edit screen", function() {

      var rows = element.all(by.repeater("person in $data"));

      // Grab the first contacts last name, and load view screen for them.
      var lastName;
      rows.first().element(by.id("cellLastName")).element(by.id("cellLastNameLink")).getText().then(function(text) {
         lastName = text;
      });
      rows.first().element(by.id("cellLastName")).element(by.id("cellLastNameLink")).click();

      // Click the Edit button to load the edit screen
      element(by.id("btnEdit")).click();

      // Click Delete
      element(by.id("btnDelete")).click();

      // Verify we're back to the list
      expect(browser.getCurrentUrl()).toContain('#/list');

      // Verify the contact isn't in the list
      rows = element.all(by.repeater("person in $data")).all(by.id("cellLastName"));
      expect(rows.getText()).not.toContain(lastName);
   });


   /*
    * Add a person
    */
   it ("should add a new contact", function() {

      // Click the New Contact link
      browser.get("angularcrud/#/new");

      // Fill in the form
      element(by.id("firstName")).clear().sendKeys("Jim");
      element(by.id("lastName")).clear().sendKeys("Shea");
      element(by.id("street")).clear().sendKeys("4800 Oak Grove Dr");
      element(by.id("city")).clear().sendKeys("Pasadena");
      element(by.id("state")).clear().sendKeys("CA");
      element(by.id("zip")).clear().sendKeys("91109");
      element(by.id("homePhone")).clear().sendKeys("8183547751");
      element(by.id("mobile")).clear().sendKeys("8185551212");
      element(by.id("email")).clear().sendKeys("jshea@jpl.nasa.gov");
      element(by.id("website")).clear().sendKeys("http://wwwebiscom"); // DB saving with no .'s.

      // Click add
      element(by.id("btnAdd")).click();

      // Verify the contact is in the list
      browser.get("angularcrud/#/list");
      rows = element.all(by.repeater("person in $data")).all(by.id("cellLastName"));
      expect(rows.getText()).toContain("Shea");
   });
});