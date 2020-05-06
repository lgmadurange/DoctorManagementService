<%@page import="model.Doctor"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Doctor Management - Operation</title>
<link rel="stylesheet" href="views/boostrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/operations.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Doctor Management - Operation</h1>
				<form id="formOperation" name="formOperation">
					Operation Code: <input id="operCode" name="operCode" type="text"
						class="form-control form-control-sm"> <br> 
					Operation Name: <input id="operName" name="operName" type="text"
						class="form-control form-control-sm"> <br>
					Operation Date: <input id="operDate" name="operDate" type="text"
						class="form-control form-control-sm"> <br>
					Operation Description: <input id="operDesc" name="operDesc" type="text"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidOperationIDSave" name="hidOperationIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divOperationsGrid">
					<%
						Doctor doctorObj = new Doctor();
					out.print(doctorObj.readOperation());
					%>
				</div>
			</div>
		</div>
	</div>

</body>
</html>