package com.mydomain.person.model;


import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

/*
 * This is a full person/contact DTO. This is for reference as AngularCRUD only uses the first and last name.
 */

/**
 * Data object representing an individual.
 *
 * @author jshea
 */
@XmlRootElement
public class Person implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id			= null;
	private String  firstName  = "";
	private String  lastName   = "";
   private Address address    = new Address();
	private String  homePhone  = "";
	private String  mobile     = "";
	private String  email		= "";
	private String  website		= "";


	/**
	 * Constructors
	 */
	public Person() { }

	public Person(String firstName, String lastName,
                 String hPhone, String mPhone,
                 String email, String website) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.homePhone = hPhone;
		this.mobile = mPhone;
		this.email = email;
		this.website = website;
	}

	public Person(Person p) {
		this.firstName = p.getFirstName();
		this.lastName = p.getLastName();
		this.homePhone = p.getHomePhone();
		this.mobile = p.getMobile();
		this.email = p.getEmail();
		this.website = p.getWebsite();
	}


	// Id
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	// First Name
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
	   this.firstName = (firstName!=null?firstName:"");
	}

	// Last Name
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
	   this.lastName = (lastName!=null?lastName:"");
	}

   // Address
   public Address getAddress() {
      return address;
   }
   public void setAddress(Address address) {
      this.address = address;
   }

	// Home phone number
	public String getHomePhone() {
		return homePhone;
	}
	public String getHomePhoneFormatted() {
		return Util.formatPhoneNumber(homePhone);
	}
	public void setHomePhone(String homePhone) {
		this.homePhone = Util.stripPhoneNumber(homePhone);
	}

	// Mobile phone number
	public String getMobile() {
		return mobile;
	}
	public String getMobilePhoneFormatted() {
		return Util.formatPhoneNumber(mobile);
	}
	public void setMobile(String mobile) {
		this.mobile = Util.stripPhoneNumber(mobile);
	}

	// Email
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
	   this.email = (email!=null?email:"");
	}

	// Website
	public String getWebsite() {
		return website;
	}
	public String getWorkPhoneFormatted() {
		return Util.formatPhoneNumber(website);
	}
	public void setWebsite(String website) {
		this.website = Util.stripPhoneNumber(website);
	}


	/* Utility methods */

	public String getName() {
		return Util.getProperCase(firstName+" "+lastName);
	}
	public String getFullName() {
		return getName();
	}


	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();

		sb.append("{");

		sb.append("id:").append(id).append(", ");
		sb.append("firstName:").append(firstName).append(", ");
		sb.append("lastName:").append(lastName).append(", ");
		sb.append("address:").append(address.toString()).append(", ");
		sb.append("homePhone:").append(homePhone).append(", ");
		sb.append("mobile:").append(mobile).append(", ");
		sb.append("email:").append(email).append(", ");
		sb.append("website:").append(website);

		sb.append("}");

		return sb.toString();
	}

}