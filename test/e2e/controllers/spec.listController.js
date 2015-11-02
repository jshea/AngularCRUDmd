/* global browser, expect, by, element, protractor */

describe("Review Controller", function() {
   // Seed test data. These are just lists of test cases.
   var testData1 = require("./../data/testData1.json");
   var testData2 = require("./../data/testData2.json");
   var testData3 = require("./../data/testData3.json");

   // Load the review page based on a test case
   var loadByManagerAndWeekEnding = function(testCase) {
      // Elements.
      var mgrBadgeNoElem = element(by.id("mgrBadgeNo"));
      var datePickerElem = element(by.id("datePicker"));
      var searchButtonElem = element(by.id("searchButton"));
      var mgrNameElem = element(by.id("mgrName"));
      var mgrOrgElem = element(by.id("mgrOrg"));

      // Fill out manager form and search
      mgrBadgeNoElem.clear().sendKeys(testCase.managerBadgeNumber);
      datePickerElem.clear().sendKeys(testCase.weekEnding);
      searchButtonElem.click();

      // Wait for detail panel to load for up to 30 seconds (30000 ms).
      // Calling emelemt(by.id("detailPanel")) directly because it is not defined until visible.
      browser.driver.wait(protractor.until.elementIsVisible(element(by.id("detailPanel"))), 30000);
      expect(element(by.id("detailPanel")).isPresent()).toBe(true);

      // Make sure manager form is correct.
      expect(mgrNameElem.getText()).toBe(testCase.managerName);
      expect(mgrOrgElem.getText()).toBe(testCase.managerOrg);
   };

   // Setup - runs before each test
   beforeEach(function() {
      // Our URL is prefixed with baseUrl from config.js.
      var url = "timecardreview/#/";
      browser.get(url);
   });

   // Tear-down - runs after each test
   afterEach(function() {});

   it ("should load the manager form correctly", function() {
      // Run all test cases in testData1.json except for the first one (which contains meta-data).
      for (var i = 1; i < testData1.length; ++i) {
         var testCase = testData1[i]; // Get the ith test case.

         // Initial load.
         loadByManagerAndWeekEnding(testCase);

         // Elements.
         var mgrFormElem = element(by.id("mgrForm"));
         var datePickerElem = element(by.id("datePicker"));
         var searchButtonElem = element(by.id("searchButton"));
         var refreshButtonElem = element(by.id("refreshButton"));
         var mgrNameElem = element(by.id("mgrName"));
         var mgrOrgElem = element(by.id("mgrOrg"));

         // Check if all elements are present.
         expect(mgrFormElem.isPresent()).toBe(true);
         expect(datePickerElem.isPresent()).toBe(true);
         expect(searchButtonElem.isPresent()).toBe(true);
         expect(refreshButtonElem.isPresent()).toBe(true);
         expect(mgrNameElem.isPresent()).toBe(true);
         expect(mgrOrgElem.isPresent()).toBe(true);
      }
   });

   it ("should load the employee list correctly", function() {
      // Run all test cases in testData1.json except for the first one (which contains meta-data).
      for (var i = 1; i < testData1.length; ++i) {
         var testCase = testData1[i]; // Get the ith test case

         // Initial load
         loadByManagerAndWeekEnding(testCase);

         // Elements
         var empNameElem = element(by.id("empName"));
         var activeEmployeeElem = element(by.css(".nav-pills > li.active > a"));

         // Check if we have the correct number of employees in the side panel
         expect(element.all(by.id("employeeListName")).count()).toEqual(testCase.employeeCount);

         // Active employee tests.
         activeEmployeeElem.isPresent().then(function(result) {
            var allActiveElements = element.all(protractor.By.css(".nav-pills > li.active > a"));

            if (result) { // First Case: We have an active employee, which means result == true.
               // Check active employee name in side panel matches report name.
               expect(activeEmployeeElem.getText()).toBe(empNameElem.getText());

               // Also check that we only have one active employee.
               expect(allActiveElements.count()).toEqual(1);
            }
            else { // Second Case: No active employee. This should imply all employees are reviewed.
               // There should be no active employee.
               expect(allActiveElements.count()).toEqual(0);

               // No employees should be in the Complete or Incomplete lists.
               expect(element.all(by.id("employeeListItemComplete")).count()).toEqual(0);
               expect(element.all(by.id("employeeListItemIncomplete")).count()).toEqual(0);

               // The total count of employees for a manager should be equal to the
               // count of employees in the reviewd and noTimecardRequired lists.
               element.all(by.id("employeeListItemReviewed")).count().then(function(reviewedCount) {
                  element.all(by.id("employeeListItemNoTimecardRequired")).count().then(function(noTimecardRequiredCount) {
                     expect(reviewedCount + noTimecardRequiredCount).toEqual(testCase.employeeCount);
                  });
               });
            }
         });
      }
   });

   it ("should review a complete employee correctly", function() {
      // Run all test cases in testData1.json except for the first one (which contains meta-data)
      for (var i = 1; i < testData1.length; ++i) {
         var testCase = testData1[i]; // Get the ith test case

         // Initial load.
         loadByManagerAndWeekEnding(testCase);

         // Elements / Classes.
         var reviewedElem = element(by.id("reviewed"));
         var allDoneElem = element(by.id("allDone"));
         var activeEmployeeClass = "employeeFontStyle ng-scope active";

         // Get list of all complete employee elements, and all reviewed employee elements
         var allCompleteEmployees = element.all(by.id("employeeListItemComplete"));
         var allIncompleteEmployees = element.all(by.id("employeeListItemIncomplete"));
         var allReviewedEmployees = element.all(by.id("employeeListItemReviewed")).all(by.id("employeeListName"));

         // Count how many complete employees we currently have
         allCompleteEmployees.count().then(function(count) {
            if (count > 0) { // If we have complete employees
               // Get the first complete employee.
               var firstCompleteEmployee = allCompleteEmployees.get(0);

               // Make sure first employee in complete list is active
               expect(firstCompleteEmployee.getAttribute("class")).toBe(activeEmployeeClass);

               // Make sure the review button is present
               expect(reviewedElem.isPresent()).toBe(true);

               // Get name of first employee
               firstCompleteEmployee.element(by.css(".nav-pills > li.active > a")).getText().then(function(employeeName) {
                  // Click on the reviewed checkbox.
                  reviewedElem.click();

                  // Check if employeeName is now in reviewed list
                  expect(allReviewedEmployees.getText()).toContain(employeeName);

                  if (count > 1) { // Complete list is still not empty
                     // Get the first complete employee again
                     firstCompleteEmployee = allCompleteEmployees.get(0);

                     // Check again if first employee in complete list is active.
                     expect(firstCompleteEmployee.getAttribute("class")).toBe(activeEmployeeClass);
                  }
                  else {
                     // Check if there are any incomplete employees
                     allIncompleteEmployees.count().then(function(count) {
                        if (count > 0) {
                           // Get the first incomplete employee
                           var firstIncompleteEmployee = allIncompleteEmployees.get(0);

                           // Make sure the first incomplete employee is now active
                           expect(firstIncompleteEmployee.getAttribute("class")).toBe(activeEmployeeClass);
                        }
                        else { // No complete or incomplete employees
                           expect(allDoneElem.isPresent()).toBe(true);
                        }
                     });
                  }
               });
            }
         });
      }
   });

   it ("should not change an active incomplete employee after clicking follow-up", function() {
      // Run all test cases in testData1.json except for the first one (which contains meta-data).
      for (var i = 1; i < testData1.length; ++i) {
         var testCase = testData1[i]; // Get the ith test case

         // Initial load
         loadByManagerAndWeekEnding(testCase);

         // Elements / Classes
         var activeEmployeeClass = "employeeFontStyle ng-scope active";
         var allIncompleteEmployees = element.all(by.id("employeeListItemIncomplete"));
         var followupRequiredElem = element(by.id("followupRequired"));

         // Count our incomplete employees
         allIncompleteEmployees.count().then(function(count) {
            if (count > 0) { // If we have incomplete employees
               // Get the first incomplete employee in the list
               var firstIncompleteEmployee = allIncompleteEmployees.get(0);

               // Click on them to activate them
               firstIncompleteEmployee.element(by.id("employeeListName")).click();

               // Make sure they are active
               expect(firstIncompleteEmployee.getAttribute("class")).toBe(activeEmployeeClass);

               // Find the Follow-up checkbox and make sure it is present
               expect(followupRequiredElem.isPresent()).toBe(true);

               // Click on the Follow-up checkbox
               followupRequiredElem.click();

               // The same employee should still be active
               expect(firstIncompleteEmployee.getAttribute("class")).toBe(activeEmployeeClass);

               // Click on the Follow-up checkbox
               followupRequiredElem.click();

               // The same employee should still be active
               expect(firstIncompleteEmployee.getAttribute("class")).toBe(activeEmployeeClass);
            }
         });
      }
   });

   it ("should behave properly if payroll entered a paper timecard", function() {
      // Run all test cases in testData2.json except for the first one (which contains meta-data).
      for (var i = 1; i < testData2.length; ++i) {
         var testCase = testData2[i]; // Get the ith test case

         // Initial load
         loadByManagerAndWeekEnding(testCase);

         // Elements / Classes
         var empNameElem = element(by.id("empName"));
         var activeEmployeeElem = element(by.css(".nav-pills > li.active > a"));
         var reviewedCheckboxElem = element(by.id("reviewed"));
         var followUpCheckboxElem = element(by.id("followupRequired"));
         var followUpReasonElem = element(by.model("directReport.review.followupReason"));
         var paperTimecardElem = element(by.id("paperTimecard"));
         var noTimecardEntriesElem = element(by.id("allocationsGridHidden"));

         // Get a list of all of our reviewed employee names
         var allReviewedEmployees = element.all(by.id("employeeListItemReviewed"));

         // There should be at least one Reviewed employee (the one with the paper timecard entered)
         expect(allReviewedEmployees.count()).toBeGreaterThan(0);

         // Click on our employee with the papar timecard
         element(by.linkText(testCase.employeeNameWithPaperTimecard)).click();

         // Make sure our paper time card employee is active
         expect(activeEmployeeElem.isPresent()).toBe(true);
         expect(activeEmployeeElem.getText()).toBe(empNameElem.getText());

         // The Reviewed checkbox should be present, checked (selected), and disabled
         expect(reviewedCheckboxElem.isPresent()).toBe(true);
         expect(reviewedCheckboxElem.isSelected()).toBe(true);
         expect(reviewedCheckboxElem.isEnabled()).toBe(false);

         // The Follow-up checkbox should be present, unchecked (not selected), and disabled
         expect(followUpCheckboxElem.isPresent()).toBe(true);
         expect(followUpCheckboxElem.isSelected()).toBe(false);
         expect(followUpCheckboxElem.isEnabled()).toBe(false);

         // The follow-up Reason sould be present, and disabled
         expect(followUpReasonElem.isPresent()).toBe(true);
         expect(followUpReasonElem.isEnabled()).toBe(false);

         // Make sure the follow-up Reason is Paper Timecard Submitted (option value 5)
         expect(followUpReasonElem.getAttribute("value")).toEqual("? string:5 ?");

         // Check that we are properly displaying that payroll entered the paper timecard
         expect(paperTimecardElem.isPresent()).toBe(true);
         expect(paperTimecardElem.element(by.tagName("strong")).getText()).toEqual(testCase.payrollText);

         // Check that we are properly displaying that no timecard entries were made for the given week ending
         expect(noTimecardEntriesElem.isPresent()).toBe(true);
         expect(noTimecardEntriesElem.element(by.tagName("strong")).getText()).toEqual("No timecard entries made for this week ending.");
      }
   });

   it ("should disable/enable prev week and next week properly", function() {
      // Run all test cases in testData3.json except for the first one (which contains meta-data)
      for (var i = 1; i < testData3.length; ++i) {
         var testCase = testData3[i]; // Get the ith test case

         // Initial load
         loadByManagerAndWeekEnding(testCase);

         // Elements / Classes
         var disabledButtonElem = element(by.id(testCase.disabledButtonId));
         var enabledButtonElem = element(by.id(testCase.enabledButtonId));

         // Find the employee we want to test in the list and click them
         element(by.linkText(testCase.employeeFullName)).click();

         // Test that the correct buttons are disabled/enabled based on the testCase
         expect(disabledButtonElem.isEnabled()).toBe(false);
         expect(enabledButtonElem.isEnabled()).toBe(true);
      }
   });
});
