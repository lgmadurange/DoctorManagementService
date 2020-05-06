$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateDoctorForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidDoctorIDSave").val() == "") ? "POST" : "PUT";
	$.ajax({
		url : "DoctorAPI",
		type : type,
		data : $("#formDoctor").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onDoctorSaveComplete(response.responseText, status);
		}
	});
	// $("#formDoctor").submit();
});
function onDoctorSaveComplete(response, status) {
	var resultSet = JSON.parse(response);
	if (resultSet.status.trim() == "success") {
		$("#alertSuccess").text("Successfully saved.");
		$("#alertSuccess").show();
		$("#divDoctorsGrid").html(resultSet.data);
	} else if (resultSet.status.trim() == "error") {
		$("#alertError").text(resultSet.data);
		$("#alertError").show();
	}

	else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidDoctorIDSave").val("");
	$("#formDoctor")[0].reset();

}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidDoctorIDSave").val(
					$(this).closest("tr").find('#hidDoctorIDUpdate').val());
			$("#docCode").val($(this).closest("tr").find('td:eq(0)').text());
			$("#docName").val($(this).closest("tr").find('td:eq(1)').text());
			$("#docPhone").val($(this).closest("tr").find('td:eq(2)').text());
			$("#docHospital").val($(this).closest("tr").find('td:eq(3)').text());
			$("#docSpecial").val($(this).closest("tr").find('td:eq(4)').text());
		});

// Remove============================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "DoctorAPI",
		type : "DELETE",
		data : "docID=" + $(this).data("docid"),
		dataType : "text",
		complete : function(response, status) {
			onDoctorDeleteComplete(response.responseText, status);
		}
	});
});

function onDoctorDeleteComplete(response, status) {
	
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			
			$("#divDoctorsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
		
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENTMODEL=========================================================================
function validateDoctorForm() {
	// CODE
	if ($("#docCode").val().trim() == "") {
		return "Insert Doctor Code.";
	}
	// NAME
	if ($("#docName").val().trim() == "") {
		return "Insert Doctor Name.";
	}

	// PRICE-------------------------------
	if ($("#docPhone").val().trim() == "") {
		return "Insert Doctor Phone.";
	}
	

	if ($("#docHospital").val().trim() == "") {
		return "Insert Doctor Hospital.";
	}
	
	if ($("#docSpecial").val().trim() == "") {
		return "Insert Doctor Special.";
	}
	return true;
}