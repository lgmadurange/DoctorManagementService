<%@page import="model.Doctor"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Doctor Management - Doctor</title>
<link rel="stylesheet" href="views/boostrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/doctors.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Doctor Management - Doctor</h1>
				<form id="formDoctor" name="formDoctor">
					Doctor Code: <input id="docCode" name="docCode" type="text"
						class="form-control form-control-sm"> <br> 
					Doctor Name: <input id="docName" name="docName" type="text"
						class="form-control form-control-sm"> <br>
					Doctor Phone: <input id="docPhone" name="docPhone" type="text"
						class="form-control form-control-sm"> <br>
					Doctor Hospital: <input id="docHospital" name="docHospital" type="text"
						class="form-control form-control-sm"> <br>
					Doctor Special: <input id="docSpecial" name="docSpecial" type="text"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidDoctorIDSave" name="hidDoctorIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divDoctorsGrid">
					<%
						Doctor doctorObj = new Doctor();
					out.print(doctorObj.readDoctor());
					%>
				</div>
			</div>
		</div>
	</div>

</body>
</html>