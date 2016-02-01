package com.mydomain.person.model;

import com.sun.jersey.api.client.ClientResponse;
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
public class UseCaseTest {
	private static UnitTestUtil utUtil = null;

    public UseCaseTest() {}


	@BeforeClass
	public static void setUpClass() throws Exception {
		utUtil = new UnitTestUtil();
	}

	@AfterClass
	public static void tearDownClass() throws Exception {
//		Do any global data cleanup
	}

	@Before
	public void setUp() {
      // Do setup prior to each test
   }

	@After
	public void tearDown() { }


	/**
	 *
	 *
	 */
	@Test
	public void test2205() {
      Person expected = new Person();


		ClientResponse cr = utUtil.runGet("/113626/2015-04-26/");
		assertEquals(200, cr.getStatus());
		String response = cr.getEntity(String.class);

      // Get our returned JSON into our Java object structure
		Person actual = UnitTestUtil.jsonToPunchesPayload(response);
      System.out.println("Expected" + expected.toString());
      System.out.println("Actual" + actual.toString());

		assertTrue(expected.toString().equals(actual.toString()));
	}

}
