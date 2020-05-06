<%@page import="model.Doctor"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Doctor Management - Prescription</title>
<link rel="stylesheet" href="views/boostrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/prescriptions.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Doctor Management - Prescription</h1>
				<form id="formPrescription" name="formPrescription">
					Prescription Code: <input id="presCode" name="presCode" type="text"
						class="form-control form-control-sm"> <br> 
					Prescription Name: <input id="presName" name="presName" type="text"
						class="form-control form-control-sm"> <br>
					Prescription Age: <input id="presAge" name="presAge" type="text"
						class="form-control form-control-sm"> <br>
					Prescription Date: <input id="presDate" name="presDate" type="text"
						class="form-control form-control-sm"> <br>
					Prescription Description: <input id="presDesc" name="presDesc" type="text"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidPrescriptionIDSave" name="hidPrescriptionIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divPrescriptionsGrid">
					<%
						Doctor doctorObj = new Doctor();
					out.print(doctorObj.readPrescription());
					%>
				</div>
			</div>
		</div>
	</div>

</body>
</html>