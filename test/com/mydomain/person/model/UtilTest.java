package com.mydomain.person.model;

import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

/**
 *
 * @author jshea
 */
public class UtilTest {
   @Rule
   public ExpectedException thrown= ExpectedException.none();

   public UtilTest() { }


   @BeforeClass
   public static void setUpClass() { }

   @AfterClass
   public static void tearDownClass() {  }


   @Before
   public void setUp() { }

   @After
   public void tearDown() { }


   /**
    * Test of stripPhoneNumber method, of class Util.
    */
   @Test
   public void testStripPhoneNumber() {
      System.out.println("stripPhoneNumber");

      String expResult = "1234567890";
      assertEquals(expResult, Util.stripPhoneNumber("1234567890"));
      assertEquals(expResult, Util.stripPhoneNumber(" 12 345 678 90 "));
      assertEquals(expResult, Util.stripPhoneNumber("-123-456-789-0-"));
      assertEquals(expResult, Util.stripPhoneNumber(".123.45678.90."));
      assertEquals(expResult, Util.stripPhoneNumber("(123(4567890("));
      assertEquals(expResult, Util.stripPhoneNumber(")12345)67)890)"));
      assertEquals(expResult, Util.stripPhoneNumber(" 1-2.3(4)5)6(7.8-9 0 "));
   }


   /**
    * Test of formatPhoneNumber method, of class Util.
    */
   @Test
   public void testFormatPhoneNumber() {
      System.out.println("formatPhoneNumber");

      assertEquals("", Util.formatPhoneNumber(""));
      assertEquals("354", Util.formatPhoneNumber("354"));
      assertEquals("3547", Util.formatPhoneNumber("3547"));
      assertEquals("354-7751", Util.formatPhoneNumber("3547751"));
      assertEquals("(818) 354-7751", Util.formatPhoneNumber("8183547751"));
      assertEquals("1 (818) 354-7751", Util.formatPhoneNumber("18183547751"));
   }


   /**
    * Test of getProperCase method, of class Util.
    */
   @Test
   public void testGetProperCase() {
      System.out.println("getProperCase");

      assertEquals("", Util.getProperCase(""));
      assertEquals("", Util.getProperCase(null));
      assertEquals("123 @%& Huh?", Util.getProperCase("123 @%& huh?"));
      assertEquals("Hello, World!", Util.getProperCase("hello, world!"));
   }


   /**
    * Test of getProperCase method, of class Util.
    */
   @Test
   public void testGetRandomInt() {
      System.out.println("getRandomInt");

      int randomInt = Util.getRandomNumber(1, 5);
      assertTrue(randomInt > 0);
      assertTrue(randomInt < 6);

      randomInt = Util.getRandomNumber(5, 5);
      assertTrue(randomInt > 0);
      assertTrue(randomInt < 6);

      thrown.expect(IllegalArgumentException.class);
      randomInt = Util.getRandomNumber(5, 1);
   }

}
