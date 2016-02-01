package com.mydomain.person;

import com.mydomain.person.model.Person;
import javax.ws.rs.core.Response;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author jshea
 */
public class PersonResourceTest {

   public PersonResourceTest() {
   }


   @BeforeClass
   public static void setUpClass() {
   }


   @AfterClass
   public static void tearDownClass() {
   }


   @Before
   public void setUp() {
   }


   @After
   public void tearDown() {
   }


   /**
    * Test of getAll method, of class PersonResource.
    */
   @Test
   public void testGetAll() throws Exception {
      System.out.println("getAll");
      PersonResource instance = new PersonResource();
      Response expResult = null;
      Response result = instance.getAll();
      assertEquals(expResult, result);
      // TODO review the generated test code and remove the default call to fail.
      fail("The test case is a prototype.");
   }


   /**
    * Test of getPerson method, of class PersonResource.
    */
   @Test
   public void testGetPerson() throws Exception {
      System.out.println("getPerson");
      int id = 0;
      PersonResource instance = new PersonResource();
      Response expResult = null;
      Response result = instance.getPerson(id);
      assertEquals(expResult, result);
      // TODO review the generated test code and remove the default call to fail.
      fail("The test case is a prototype.");
   }


   /**
    * Test of add method, of class PersonResource.
    */
   @Test
   public void testAdd() throws Exception {
      System.out.println("add");
      Person p = null;
      PersonResource instance = new PersonResource();
      Response expResult = null;
      Response result = instance.add(p);
      assertEquals(expResult, result);
      // TODO review the generated test code and remove the default call to fail.
      fail("The test case is a prototype.");
   }


   /**
    * Test of update method, of class PersonResource.
    */
   @Test
   public void testUpdate() throws Exception {
      System.out.println("update");
      Person p = null;
      PersonResource instance = new PersonResource();
      Response expResult = null;
      Response result = instance.update(p);
      assertEquals(expResult, result);
      // TODO review the generated test code and remove the default call to fail.
      fail("The test case is a prototype.");
   }


   /**
    * Test of delete method, of class PersonResource.
    */
   @Test
   public void testDelete() throws Exception {
      System.out.println("delete");
      int id = 0;
      PersonResource instance = new PersonResource();
      Response expResult = null;
      Response result = instance.delete(id);
      assertEquals(expResult, result);
      // TODO review the generated test code and remove the default call to fail.
      fail("The test case is a prototype.");
   }


   /**
    * Test of deleteAll method, of class PersonResource.
    */
   @Test
   public void testDeleteAll() throws Exception {
      System.out.println("deleteAll");
      PersonResource instance = new PersonResource();
      Response expResult = null;
      Response result = instance.deleteAll();
      assertEquals(expResult, result);
      // TODO review the generated test code and remove the default call to fail.
      fail("The test case is a prototype.");
   }

}
