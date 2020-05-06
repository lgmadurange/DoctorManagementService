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
	var status = validatePrescriptionForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidPrescriptionIDSave").val() == "") ? "POST" : "PUT";
	$.ajax({
		url : "PrescriptionAPI",
		type : type,
		data : $("#formPrescription").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onPrescriptionSaveComplete(response.responseText, status);
		}
	});
	// $("#formPrescription").submit();
});
function onPrescriptionSaveComplete(response, status) {
	var resultSet = JSON.parse(response);
	if (resultSet.status.trim() == "success") {
		$("#alertSuccess").text("Successfully saved.");
		$("#alertSuccess").show();
		$("#divPrescriptionsGrid").html(resultSet.data);
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

	$("#hidPrescriptionIDSave").val("");
	$("#formPrescription")[0].reset();

}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidPrescriptionIDSave").val(
					$(this).closest("tr").find('#hidPrescriptionIDUpdate').val());
			$("#presCode").val($(this).closest("tr").find('td:eq(0)').text());
			$("#presName").val($(this).closest("tr").find('td:eq(1)').text());
			$("#presAge").val($(this).closest("tr").find('td:eq(2)').text());
			$("#presDate").val($(this).closest("tr").find('td:eq(3)').text());
			$("#presDesc").val($(this).closest("tr").find('td:eq(4)').text());
		});

// Remove============================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PrescriptionAPI",
		type : "DELETE",
		data : "presID=" + $(this).data("presid"),
		dataType : "text",
		complete : function(response, status) {
			onPrescriptionDeleteComplete(response.responseText, status);
		}
	});
});

function onPrescriptionDeleteComplete(response, status) {
	
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			
			$("#divPrescriptionsGrid").html(resultSet.data);
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
function validatePrescriptionForm() {
	// CODE
	if ($("#presCode").val().trim() == "") {
		return "Insert Prescription Code.";
	}
	// NAME
	if ($("#presName").val().trim() == "") {
		return "Insert Prescription Name.";
	}

	// PRICE-------------------------------
	if ($("#presAge").val().trim() == "") {
		return "Insert Prescription Age.";
	}
	

	if ($("#presDate").val().trim() == "") {
		return "Insert Prescription Date.";
	}
	
	if ($("#presDesc").val().trim() == "") {
		return "Insert Prescription Description.";
	}
	return true;
}