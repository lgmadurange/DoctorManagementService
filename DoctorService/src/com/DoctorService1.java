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

@Path("/DoctorsPrescriptions")
public class DoctorService1
{
	
			Doctor doctorObj = new Doctor();
	

//###################################################################################
			
			@GET
			@Path("/")
			@Produces(MediaType.TEXT_HTML)
			public String readPrescription()
			{
				return doctorObj.readPrescription();
			}

//#####################################################################################
			
			@POST
			@Path("/")
			@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
			@Produces(MediaType.TEXT_PLAIN)
			public String insertPrescription(@FormParam("presCode") String presCode,
					@FormParam("presName") String presName,
					@FormParam("presAge") String presAge,
					@FormParam("presDate") String presDate,
					@FormParam("presDesc") String presDesc)
			{
			 String output = doctorObj.inserPrescription(presCode, presName, presAge, presDate, presDesc);
			return output;
			}

//#########################################################################################
			
			@PUT
			@Path("/")
			@Consumes(MediaType.APPLICATION_JSON)
			@Produces(MediaType.TEXT_PLAIN)
			public String updatePrescription(String PresData)

			{
			
				//Convert the input string to a JSON object
				JsonObject DoctorObject = new JsonParser().parse(PresData).getAsJsonObject();
			
				//Read the values from the JSON object
				String presID = DoctorObject.get("presID").getAsString();
				String presCode = DoctorObject.get("presCode").getAsString();
				String presName = DoctorObject.get("presName").getAsString();
				String presAge = DoctorObject.get("presAge").getAsString();
				String presDate = DoctorObject.get("presDate").getAsString();
				String presDesc = DoctorObject.get("presDesc").getAsString();
				String output = doctorObj.updatePrescription(presID, presCode, presName, presAge, presDate, presDesc);
			
				return output;
			}
//##########################################################################################		
			
			@DELETE
			@Path("/")
			@Consumes(MediaType.APPLICATION_XML)
			@Produces(MediaType.TEXT_PLAIN)
			public String deletePrescription(String presData)
			{
			
				//Convert the input string to an XML document
				Document doc = Jsoup.parse(presData, "", Parser.xmlParser());

				//Read the value from the element <ID>
				String presID = doc.select("presID").text();
				String output = doctorObj.deletePrescription(presID);
				return output;
			

			}


}