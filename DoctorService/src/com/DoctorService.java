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

@Path("/DoctorsOperations")
public class DoctorService
{
	
			Doctor doctorObj = new Doctor();
	

//###################################################################################
			
			@GET
			@Path("/")
			@Produces(MediaType.TEXT_HTML)
			public String readOperation()
			{
				return doctorObj.readOperation();
			}

//#####################################################################################
			
			@POST
			@Path("/")
			@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
			@Produces(MediaType.TEXT_PLAIN)
			public String insertOperation(@FormParam("operCode") String operCode,
					@FormParam("operName") String operName,
					@FormParam("operDate") String operDate,
					@FormParam("operDesc") String operDesc)
			{
			 String output = doctorObj.inserOperation(operCode, operName, operDate, operDesc);
			return output;
			}
					
//#########################################################################################
			
			@PUT
			@Path("/")
			@Consumes(MediaType.APPLICATION_JSON)
			@Produces(MediaType.TEXT_PLAIN)
			public String updateOperation(String OperData)
			{
			
				//Convert the input string to a JSON object
				JsonObject DoctorObject = new JsonParser().parse(OperData).getAsJsonObject();
			
				//Read the values from the JSON object
				String operID = DoctorObject.get("operID").getAsString();
				String operCode = DoctorObject.get("operCode").getAsString();
				String operName = DoctorObject.get("operName").getAsString();
				String operDate = DoctorObject.get("operDate").getAsString();
				String operDesc = DoctorObject.get("operDesc").getAsString();
				String output = doctorObj.updateOperation(operID, operCode, operName, operDate, operDesc);
			
				return output;
			}

//##########################################################################################		
		
			@DELETE
			@Path("/")
			@Consumes(MediaType.APPLICATION_XML)
			@Produces(MediaType.TEXT_PLAIN)
			public String deleteOperation(String operData)
			{
			
				//Convert the input string to an XML document
				Document doc = Jsoup.parse(operData, "", Parser.xmlParser());

				//Read the value from the element <ID>
				String operID = doc.select("operID").text();
				String output = doctorObj.deleteOperation(operID);
				return output;
			

			}}