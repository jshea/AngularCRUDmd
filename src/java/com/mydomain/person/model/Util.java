package com.mydomain.person.model;

/**
 * This is a collection of string manipulation utilities.
 * @author jshea
 */
public class Util {

	public static String stripPhoneNumber(String phoneNumber) {
		String tmpPhone = phoneNumber;

		if (tmpPhone==null || tmpPhone.isEmpty()) { return ""; }
		tmpPhone = tmpPhone.replace(" ", "");
		tmpPhone = tmpPhone.replace("-", "");
		tmpPhone = tmpPhone.replace(".", "");
		tmpPhone = tmpPhone.replace("(", "");
		tmpPhone = tmpPhone.replace(")", "");

      // or use a regex
		// phoneNumber.replaceAll("[\s-\.()]", "");

      return tmpPhone;
	}


	public static String formatPhoneNumber(String phoneNumber) {
		if (phoneNumber==null || phoneNumber.isEmpty()) {
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
	public static String getProperCase(String str) {
		StringBuffer filter;
		String retVal;

	   if (str==null || str.isEmpty()) {
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

}