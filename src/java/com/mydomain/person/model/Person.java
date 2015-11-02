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

	private Integer id			 = null;
	private String  firstName   = "";
	private String  lastName    = "";
   private Address address     = new Address();
	private String  homePhone	 = "";
	private String  mobilePhone = "";
	private String  email		 = "";
	private String  website		 = "";


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
		this.mobilePhone = mPhone;
		this.email = email;
		this.website = website;
	}

	public Person(Person p) {
		this.firstName = p.getFirstName();
		this.lastName = p.getLastName();
		this.homePhone = p.getHomePhone();
		this.mobilePhone = p.getMobilePhone();
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
		return formatPhoneNumber(homePhone);
	}
	public void setHomePhone(String homePhone) {
		this.homePhone = stripPhoneNumber(homePhone);
	}

	// Mobile phone number
	public String getMobilePhone() {
		return mobilePhone;
	}
	public String getMobilePhoneFormatted() {
		return formatPhoneNumber(mobilePhone);
	}
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = stripPhoneNumber(mobilePhone);
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
		return formatPhoneNumber(website);
	}
	public void setWebsite(String website) {
		this.website = stripPhoneNumber(website);
	}


	/* Utility methods */

	public String getName() {
		return this.getProperCase(firstName+" "+lastName);
	}
	public String getFullName() {
		return getName();
	}


	private String stripPhoneNumber(String phoneNumber) {
		String tmpPhone = phoneNumber;

		if (tmpPhone==null || tmpPhone.equals("")) { return ""; }
		tmpPhone = tmpPhone.replace(" ", "");
		tmpPhone = tmpPhone.replace("-", "");
		tmpPhone = tmpPhone.replace(".", "");
		tmpPhone = tmpPhone.replace("(", "");
		tmpPhone = tmpPhone.replace(")", "");
		//phoneNumber.replaceAll("[\s-\.()]", "");
		return tmpPhone;
	}


	private String formatPhoneNumber(String phoneNumber) {
		if (phoneNumber==null || phoneNumber.equals("")) {
			return phoneNumber;
		}
		else if (phoneNumber.length()==7) {
			return phoneNumber.substring(0, 3 )+ "-" + phoneNumber.substring(3, 7);
		}
		return "(" + phoneNumber.substring(0, 3) + ") " + phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6, 10);
	}




	/**
	 * Capitalize first letter of every word.
	 * @param str
	 * @return
	 */
	protected String getProperCase(String str) {
		StringBuffer filter;
		String retVal;

	   if (str==null || str.equals("")) {
	   	retVal = str;
	   }
	   else {
	   	str = str.trim().toLowerCase();

	   	// Convert the String to a StringBuffer for faster manipulation
	   	filter = new StringBuffer(str.length());
	   	char c;
	   	// Loop through each character in the String.
	   	for (int i=0; i < str.length(); i++) {
	   		c = str.charAt(i);
	   		if (i == 0 || str.charAt(i - 1) == ' ') {
	   			filter.append(String.valueOf(c).toUpperCase());
				}
	   		else {
	   			filter.append(c);
				}
			}
		   retVal = filter.toString();
		}
	   return retVal;

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
		sb.append("mobilePhone:").append(mobilePhone).append(", ");
		sb.append("email:").append(email).append(", ");
		sb.append("website:").append(website);

		sb.append("}");

		return sb.toString();
	}

}