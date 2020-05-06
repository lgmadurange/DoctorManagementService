package com;
import model.Doctor;

//For REST Service
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

//For JSON
import com.google.gson.*;

//For XML
import org.jsoup.*;
import org.jsoup.parser.*;
import org.jsoup.nodes.Document;

//for rest services
import javax.ws.rs.*;

@Path("/DoctorsDetails")
public class DoctorService2
{
	
			Doctor doctorObj = new Doctor();
	

//###################################################################################
			@GET
			@Path("/")
			@Produces(MediaType.TEXT_HTML)
			public String readPrescription()
			{
				return doctorObj.readDoctor();			}


//#####################################################################################
			
			@POST
			@Path("/")
			@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
			@Produces(MediaType.TEXT_PLAIN)
			public String insertDoctor(@FormParam("docCode") String docCode,
					@FormParam("docName") String docName,
					@FormParam("docPhone") String docPhone,
					@FormParam("docHospital") String docHospital,
					@FormParam("docSpecial") String docSpecial)
			{
			 String output = doctorObj.insertDoctor(docCode, docName, docPhone, docHospital, docSpecial);
			return output;
			}

//#########################################################################################
			
			@PUT
			@Path("/")
			@Consumes(MediaType.APPLICATION_JSON)
			@Produces(MediaType.TEXT_PLAIN)
			public String updateDoctor(String docData)

			{
			
				//Convert the input string to a JSON object
				JsonObject DoctorObject = new JsonParser().parse(docData).getAsJsonObject();
			
				//Read the values from the JSON object
				String docID = DoctorObject.get("docID").getAsString();
				String docCode = DoctorObject.get("docCode").getAsString();
				String docName = DoctorObject.get("docName").getAsString();
				String docPhone = DoctorObject.get("docPhone").getAsString();
				String docHospital = DoctorObject.get("docHospital").getAsString();
				String docSpecial = DoctorObject.get("docSpecial").getAsString();
				String output = doctorObj.updateDoctor(docID, docCode, docName, docPhone, docHospital, docSpecial);
			
				return output;
			}
//##########################################################################################		
			
			@DELETE
			@Path("/")
			@Consumes(MediaType.APPLICATION_XML)
			@Produces(MediaType.TEXT_PLAIN)
			public String deleteDoctor(String docData)
			{
			
				//Convert the input string to an XML document
				Document doc = Jsoup.parse(docData, "", Parser.xmlParser());

				//Read the value from the element <ID>
				String docID = doc.select("docID").text();
				String output = doctorObj.deleteDoctor(docID);
				return output;
			

			}


}