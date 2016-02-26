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

      // Verify the field is present
      expect(firstName.isPresent()).toBe(true);

      // Check error class assignments
      expect(firstName.getAttribute('class')).toContain('ng-invalid-required');
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-minlength');
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too short
      firstName.clear().sendKeys("1");
//      browser.pause();
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-required');
      expect(firstName.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too long
      firstName.clear().sendKeys("1234567890123456789012345");
      /* I have to sleep for a sec as the ng-message class changing takes a little
       * time? I'm not really comfortable with this but it makes the test work.
       */
      browser.sleep(1000);
      expect(firstName.getAttribute('class')).not.toContain('ng-invalid-required');
      expect(firstName.getAttribute('class')).toContain('ng-invalid-minlength');    // Not sure why ng puts this class on for max len errors!
      expect(firstName.getAttribute('class')).toContain('ng-invalid-maxlength');
   });


   /*
    * Test the lastName field validations
    */
   it ("lastName validations", function() {
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
      /* I have to sleep for a sec as the ng-message class changing takes a little
       * time? I'm not really comfortable with this but it makes the test work.
       */
      browser.sleep(1000);
      expect(lastName.getAttribute('class')).not.toContain('ng-invalid-required');
      expect(lastName.getAttribute('class')).toContain('ng-invalid-minlength');    // Not sure why ng puts this class on for max len errors!
      expect(lastName.getAttribute('class')).toContain('ng-invalid-maxlength');
   });


   /*
    * Test the state field validations
    */
   it ("state validations", function() {
      // Get a handle to the edit screen elements
      var state = element(by.id("state"));

      // Verify the field is present
      expect(state.isPresent()).toBe(true);

      // Check error class assignments
      expect(state.getAttribute('class')).not.toContain('ng-invalid-minlength');
      expect(state.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too short
      state.clear().sendKeys("1");
      browser.sleep(1000);
      expect(state.getAttribute('class')).toContain('ng-invalid-minlength');
      expect(state.getAttribute('class')).not.toContain('ng-invalid-maxlength');

      // Fill in a value that is too long
      state.clear().sendKeys("12345");
      /* I have to sleep for a sec as the ng-message class changing takes a little
       * time? I'm not really comfortable with this but it makes the test work.
       */
      browser.sleep(1000);
      expect(state.getAttribute('class')).toContain('ng-invalid-minlength');    // Not sure why ng puts this class on for max len errors!
      expect(state.getAttribute('class')).toContain('ng-invalid-maxlength');
   });


   /*
    * Test the state field validations
    */
   it ("zip validations", function() {
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
      /* I have to sleep for a sec as the ng-message class changing takes a little
       * time? I'm not really comfortable with this but it makes the test work.
       */
      browser.sleep(1000);
      expect(zip.getAttribute('class')).toContain('ng-invalid-minlength');    // Not sure why ng puts this class on for max len errors!
      expect(zip.getAttribute('class')).toContain('ng-invalid-maxlength');
   });


   /*
    * Test the email field validations
    */
   it ("email validations", function() {
      // Get a handle to the edit screen elements
      var email = element(by.id("email"));

      // Verify the field is present
      expect(email.isPresent()).toBe(true);

      // Check error class assignments
      expect(email.getAttribute('class')).not.toContain('ng-invalid');

      // Fill in a value that is valid
      email.clear().sendKeys("fred@flinstone.com");
      browser.sleep(1000);
      expect(email.getAttribute('class')).not.toContain('ng-invalid');

      // Fill in a value that is invalid
      email.clear().sendKeys("fredflinstone.com");
      /* I have to sleep for a sec as the ng-message class changing takes a little
       * time? I'm not really comfortable with this but it makes the test work.
       */
      browser.sleep(1000);
      expect(email.getAttribute('class')).toContain('ng-invalid');
   });


   /*
    * Test the email field validations
    */
   it ("website validations", function() {
      // Get a handle to the edit screen elements
      var website = element(by.id("website"));

      // Verify the field is present
      expect(website.isPresent()).toBe(true);

      // Check error class assignments
      expect(website.getAttribute('class')).not.toContain('ng-invalid');

      // Fill in a value that is valid
      website.clear().sendKeys("http://flinstone.com");
      browser.sleep(1000);
      expect(website.getAttribute('class')).not.toContain('ng-invalid');

      // Fill in a value that is invalid
      website.clear().sendKeys("flinstonecom");
      /* I have to sleep for a sec as the ng-message class changing takes a little
       * time? I'm not really comfortable with this but it makes the test work.
       */
      browser.sleep(1000);
      expect(website.getAttribute('class')).toContain('ng-invalid');
   });

/* Fields to go...
 *
 * website
 */
});