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
	var status = validateOperationForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidOperationIDSave").val() == "") ? "POST" : "PUT";
	$.ajax({
		url : "OperationAPI",
		type : type,
		data : $("#formOperation").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onOperationSaveComplete(response.responseText, status);
		}
	});
	// $("#formOperation").submit();
});
function onOperationSaveComplete(response, status) {
	var resultSet = JSON.parse(response);
	if (resultSet.status.trim() == "success") {
		$("#alertSuccess").text("Successfully saved.");
		$("#alertSuccess").show();
		$("#divOperationsGrid").html(resultSet.data);
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

	$("#hidOperationIDSave").val("");
	$("#formOperation")[0].reset();

}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidOperationIDSave").val(
					$(this).closest("tr").find('#hidOperationIDUpdate').val());
			$("#operCode").val($(this).closest("tr").find('td:eq(0)').text());
			$("#operName").val($(this).closest("tr").find('td:eq(1)').text());
			$("#operDate").val($(this).closest("tr").find('td:eq(2)').text());
			$("#operDesc").val($(this).closest("tr").find('td:eq(3)').text());
		});

// Remove============================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "OperationAPI",
		type : "DELETE",
		data : "operID=" + $(this).data("operid"),
		dataType : "text",
		complete : function(response, status) {
			onOperationDeleteComplete(response.responseText, status);
		}
	});
});

function onOperationDeleteComplete(response, status) {
	
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			
			$("#divOperationsGrid").html(resultSet.data);
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
function validateOperationForm() {
	// CODE
	if ($("#operCode").val().trim() == "") {
		return "Insert Operation Code.";
	}
	// NAME
	if ($("#operName").val().trim() == "") {
		return "Insert Operation Name.";
	}

	// PRICE-------------------------------
	if ($("#operDate").val().trim() == "") {
		return "Insert Operation Date.";
	}
	

	if ($("#operDesc").val().trim() == "") {
		return "Insert Operation Description.";
	}
	
	return true;
}