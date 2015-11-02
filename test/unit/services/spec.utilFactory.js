/* global expect */

"use strict";

describe("utilFactorySpec", function() {
   var utilFactory;

   beforeEach(module("angularcrud"));

   beforeEach(inject(function(_utilFactory_) {
      utilFactory = _utilFactory_;
   }));

   it ("should concatDates correctly", function() {
      var dateArray; // Date array we will pass to concatDates with our test cases.

      dateArray = ["2015-07-20"];
      expect(utilFactory.concatDates(dateArray)).toBe("7/20");

      dateArray = ["2015-07-20", "2015-07-21"];
      expect(utilFactory.concatDates(dateArray)).toBe("7/20-7/21");

      dateArray = ["2015-07-20", "2015-07-21", "2015-07-22"];
      expect(utilFactory.concatDates(dateArray)).toBe("7/20-7/22");

      dateArray = ["2015-07-20", "2015-07-22", "2015-07-23"];
      expect(utilFactory.concatDates(dateArray)).toBe("7/20, 7/22-7/23");

      dateArray = ["2015-07-20", "2015-07-21", "2015-07-23"];
      expect(utilFactory.concatDates(dateArray)).toBe("7/20-7/21, 7/23");

      dateArray = ["2015-07-02", "2015-07-20", "2015-07-21", "2015-07-22", "2015-07-28"];
      expect(utilFactory.concatDates(dateArray)).toBe("7/2, 7/20-7/22, 7/28");

      dateArray = ["2015-07-02", "2015-07-03", "2015-07-21", "2015-07-22", "2015-07-28"];
      expect(utilFactory.concatDates(dateArray)).toBe("7/2-7/3, 7/21-7/22, 7/28");
   });

   it ("should concatComments correctly", function() {
      var commentArray; // Comment array we will pass to concatComments with our test cases.

      commentArray = ["Comment 1"];
      expect(utilFactory.concatComments(commentArray)).toBe("Comment 1");

      commentArray = ["", "Comment 1", "Comment 1"];
      expect(utilFactory.concatComments(commentArray)).toBe(" | Comment 1");

      commentArray = ["Comment 1", "Comment 1"];
      expect(utilFactory.concatComments(commentArray)).toBe("Comment 1");

      commentArray = ["", "Comment 1", "Comment 2"];
      expect(utilFactory.concatComments(commentArray)).toBe(" | Comment 1 | Comment 2");

      commentArray = ["Comment 1", "Comment 2"];
      expect(utilFactory.concatComments(commentArray)).toBe("Comment 1 | Comment 2");

      commentArray = ["Comment 1", "", "Comment 2"];
      expect(utilFactory.concatComments(commentArray)).toBe("Comment 1 |  | Comment 2");
   });

   it ("should collapseLeavePayTypes correctly", function() {
      // Create some dummy leave pay type objects to test.
      var leavePayType1 = { comments: "Comment A", date: "2015-07-21", hours: 1, paycode: "Family Sick" };
      var leavePayType2 = { comments: "Comment B", date: "2015-07-22", hours: 2, paycode: "Family Sick" };
      var leavePayType3 = { comments: "Comment C", date: "2015-07-23", hours: 4, paycode: "Family Sick" };
      var leavePayType4 = { comments: "Shark Swimming", date: "2015-05-25", hours: 8, paycode: "Vacation" };

      // Set our leave pay type array.
      var leavePayTypeArray = [leavePayType1, leavePayType2, leavePayType3, leavePayType4];

      // Call collapseLeavePayTypes() on our leave pay type array.
      var collapsedLeavePayTypeArray = utilFactory.collapseLeavePayTypes(leavePayTypeArray);

      // Test our first result.
      var collapsedLeavePayType1 = collapsedLeavePayTypeArray[0];
      expect(collapsedLeavePayType1.comments).toBe("Comment A | Comment B | Comment C");
      expect(collapsedLeavePayType1.displayDate).toBe("7/21-7/23");

      // Test our second result.
      var collapsedLeavePayType2 = collapsedLeavePayTypeArray[1];
      expect(collapsedLeavePayType2.comments).toBe("Shark Swimming");
      expect(collapsedLeavePayType2.displayDate).toBe("5/25");
   });
});

