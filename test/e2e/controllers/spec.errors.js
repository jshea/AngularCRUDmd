/*
 * Test the UI for the AngularCRUD application
 */

/* global browser, by, element, expect, protractor */

describe("AngularCRUD", function() {

   /*
    * These optional functions run before and after this test suite. Use then to setup
    * (initialize data) and teardown (clean up after ourselves) for this full test suite.
    */
   beforeAll(function() {});
   afterAll(function() {});

   /*
    *  Setup - this runs before each test (each it()). This calls
    *  the load url so each test starts at the same place with the
    *  same initial data.
    */
   beforeEach(function() {
      // Return to the entry page
      browser.get("http://localhost:7001/angularcrud/");

      // Click the New Contact link
      element(by.linkText('New Contact')).click();
   });

   /*
    *  Tear-down - runs after each test
    */
   afterEach(function() {});


   /*
    * Test the firstName field validations
    */
   it ("firstName validations", function() {
      // Get a handle to the edit screen elements
      var firstName = element(by.id("firstName"));

      /*   Validate initial state   */

      // Verify the field is present
      expect(firstName.isPresent()).toBe(true);

      // Check error class assignments. Note, Angular's class assignments
      // are an enigma to me. This is the best I can do for now, the real
      // test is the next section which is checking the displayed error message.
      expect(firstName.getAttribute('class')).toContain('ng-invalid-required');
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-minlength');
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Fill in a value that is too short   */

      firstName.clear().sendKeys("1");
//      browser.pause();
//      browser.sleep();

      // Check error class assignments
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-required');
      expect(firstName.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(true);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Fill in a value that is too long   */

      firstName.clear().sendKeys("1234567890123456789012345");

      // Check error class assignments
      expect(firstName.getAttribute('class')).toContain('ng-invalid-required');
      expect(firstName.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(firstName.getAttribute('class')).toContain('ng-invalid-maxlength');

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(true);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Blank value and dirty, field should have the "required" message   */

      firstName.clear().sendKeys("");

      // Check error class assignments
      expect(firstName.getAttribute('class')).toContain('ng-invalid-required');
      expect(firstName.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(true);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

   });


   /*
    * Test the lastName field validations
    */
   xit ("lastName validations", function() {
      // Get a handle to the edit screen elements
      var lastName = element(by.id("lastName"));

      // Verify the field is present
      expect(lastName.isPresent()).toBe(true);

      // Check error class assignments
      expect(lastName.getAttribute('class')).toContain('ng-invalid-required');
      expect(lastName.getAttribute('class')).not.toContain('ng-invalid-minlength');
      expect(lastName.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too short
      lastName.clear().sendKeys("1");
      browser.sleep(1000);
      expect(lastName.getAttribute('class')).not.toContain('ng-invalid-required');
      expect(lastName.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(lastName.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too long
      lastName.clear().sendKeys("1234567890123456789012345");
      browser.sleep(1000);
      expect(lastName.getAttribute('class')).not.toContain('ng-invalid-required');
      expect(lastName.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(lastName.getAttribute('class')).toContain('ng-invalid-maxlength');
   });


   /*
    * Test the state field validations
    */
   xit ("state validations", function() {
      // Get a handle to the edit screen elements
      var state = element(by.id("state"));

      // Verify the field is present
      expect(state.isPresent()).toBe(true);

      // Check error class assignments
      expect(state.getAttribute('class')).not.toContain('ng-invalid-minlength');
      expect(state.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too short
      state.clear().sendKeys("1");

      expect(state.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(state.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too long
      state.clear().sendKeys("12345");

      expect(state.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(state.getAttribute('class')).toContain('ng-invalid-maxlength');
   });


   /*
    * Test the state field validations
    */
   xit ("zip validations", function() {
      // Get a handle to the edit screen elements
      var zip = element(by.id("zip"));

      // Verify the field is present
      expect(zip.isPresent()).toBe(true);

      // Check error class assignments
      expect(zip.getAttribute('class')).not.toContain('ng-invalid-minlength');
      expect(zip.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too short
      zip.clear().sendKeys("1");
      browser.sleep(1000);
      expect(zip.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(zip.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too long
      zip.clear().sendKeys("123456");
      browser.sleep(1000);
      expect(zip.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(zip.getAttribute('class')).toContain('ng-invalid-maxlength');
   });


   /*
    * Test the email field validations
    */
   xit ("email validations", function() {
      // Get a handle to the edit screen elements
      var email = element(by.id("email"));

      // Verify the field is present
      expect(email.isPresent()).toBe(true);

      // Check error class assignments
      expect(email.getAttribute('class')).not.toContain('ng-invalid');

      // Fill in a value that is valid
      email.clear().sendKeys("fred@flintstone.com"+protractor.Key.ENTER);
      expect(email.getAttribute('class')).not.toContain('ng-invalid-email');

      // Fill in a value that is invalid
      email.clear().sendKeys("fredflintstone.com");
      expect(email.getAttribute('class')).toContain('ng-invalid-email');
   });


   /*
    * Test the email field validations
    */
   xit ("website validations", function() {
      // Get a handle to the edit screen elements
      var website = element(by.id("website"));

      // Verify the field is present
      expect(website.isPresent()).toBe(true);

      // Check error class assignments
      expect(website.getAttribute('class')).not.toContain('ng-invalid');

      // Fill in a value that is valid
      website.clear().sendKeys("http://flintstone.com"+protractor.Key.ENTER);
      expect(website.getAttribute('class')).not.toContain('ng-invalid');

      // Fill in a value that is invalid
      website.clear().sendKeys("flintstonecom");
      expect(website.getAttribute('class')).toContain('ng-invalid');
   });

});