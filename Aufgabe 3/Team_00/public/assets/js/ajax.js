function pad(n) {
  n = n + '';
  return n.length >= 3 ? n : new Array(3 - n.length + 1).join(0) + n;
}

$('document').ready(function(e){
  $.ajax({
			type: "GET",
			url: 'http://localhost:3000/items',
			async: true,
			dataType: 'json',
			success: function(data) {
				$("#prop_selection").html("");
          $.each(data[0], function(index, element){
            $("#prop_selection").append("<option value=&quot;" + index + "&quot;>" + index + "</option>");
  				});
			}, error: function(jqXHR, text, err) {
			}
		});
});

$("#add_submit").click(function(e){
	e.preventDefault();

	var country_id = pad($("#country_filter_id").val());
	var country_id_range = $("#country_filter_range").val();

	const rangeID = country_id_range.split("-");
	const id1 = pad(rangeID[0]);
	const id2 = pad(rangeID[1]);

	var url = '';

	if (country_id_range) {
		url = "/" + id1 + "/" + id2;
	}
	else if (country_id){
		url = "/" + country_id;
	}

	$.ajax({
			type: "GET",
			url: 'http://localhost:3000/items' + url,
			async: true,
			dataType: 'json',
			success: function(data) {
				$("#table_body").html("");
				$.each(data, function(index, element){
					$("#table_body").append("<tr id=" + index + "></tr>");
					$("#" + index).append("<td>" + element["id"] + "</td>");
					$("#" + index).append("<td>" + element["name"] + "</td>");
					$("#" + index).append("<td>" + element["birth_rate_per_1000"] + "</td>");
					$("#" + index).append("<td>" + element["cell_phones_per_100"] + "</td>");
					$("#" + index).append("<td>" + element["children_per_woman"] + "</td>");
					$("#" + index).append("<td>" + element["electricity_consumption_per_capita"] + "</td>");
					$("#" + index).append("<td>" + element["internet_user_per_100"] + "</td>");
				});
			}, error: function(jqXHR, text, err) {
			}
		});
});


$("show_selected_prop").click(function(){
		//soll das machen, was getan werden soll, wenn "show" geklickt wird
	});
$("hide_selected_prop").click(function(){
		//soll das machen, was getan werden soll, wenn auf "hide" geklickt wird
	});
$("add_submit").click(function(){
	var country_name = $("#country_name").val();
	var country_birth = $("#country_birth").val();
	var country_cellphone = $("#country_cellphone").val();
		//soll das machen, was getan werden soll, wenn "add country" geklickt wird
	});
$("rm_submit").click(function(){
	var country_delete_id = $("#country_delete_id").val();
		//soll das machen, was getan werden soll, wenn "remove country" geklickt wird
	});
