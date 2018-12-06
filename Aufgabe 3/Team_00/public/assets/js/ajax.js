function pad(n) {
  n = n + '';
  return n.length >= 3 ? n : new Array(3 - n.length + 1).join(0) + n;
}
function visibilityFct(id) {
    var wert;
    var liste = document.getElementsByClassName(id);

    if (liste[0].style.display!="none"){
        wert="none";
    }
    else{
        wert="table-cell";
    }

    for (var index=0 ; index<liste.length; index++){
        liste[index].style.display=wert;
    }
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

    $.ajax({
  			type: "GET",
  			url: 'http://localhost:3000/items',
  			async: true,
  			dataType: 'json',
  			success: function(data) {
  				$("#table_body").html("");
  				$.each(data, function(index, element){
  					$("#table_body").append("<tr id=" + index + "></tr>");
  					$("#" + index).append("<td class=&quot;id&quot;>" + element["id"] + "</td>");
  					$("#" + index).append("<td class=&quot;name&quot;>" + element["name"] + "</td>");
  					$("#" + index).append("<td class=&quot;birth_rate_per_1000&quot;>" + element["birth_rate_per_1000"] + "</td>");
  					$("#" + index).append("<td class=&quot;cell_phones_per_100&quot; >" + element["cell_phones_per_100"] + "</td>");
  					$("#" + index).append("<td class=&quot;children_per_woman&quot;>" + element["children_per_woman"] + "</td>");
  					$("#" + index).append("<td class=&quot;electricity_consumption_per_capita&quot;>" + element["electricity_consumption_per_capita"] + "</td>");
            $("#" + index).append("<td class=&quot;gdp_per_capita&quot;>" + element["gdp_per_capita"] + "</td>");
            $("#" + index).append("<td class=&quot;gdp_per_capita_growth&quot;>" + element["gdp_per_capita_growth"] + "</td>");
            $("#" + index).append("<td class=&quot;inflation_annual&quot;>" + element["inflation_annual"] + "</td>");
            $("#" + index).append("<td class=&quot;internet_user_per_100&quot;>" + element["internet_user_per_100"] + "</td>");
            $("#" + index).append("<td class=&quot;life_expectancy&quot;>" + element["life_expectancy"] + "</td>");
            $("#" + index).append("<td class=&quot;military_expenditure_percent_of_gdp&quot;>" + element["military_expenditure_percent_of_gdp"] + "</td>");
            $("#" + index).append("<td class=&quot;gps_lat&quot;>" + element["gps_lat"] + "</td>");
  					$("#" + index).append("<td class=&quot;gps_long&quot;>" + element["gps_long"] + "</td>");


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
          $("#" + index).append("<td class=&quot;id&quot;>" + element["id"] + "</td>");
          $("#" + index).append("<td class=&quot;name&quot;>" + element["name"] + "</td>");
          $("#" + index).append("<td class=&quot;birth_rate_per_1000&quot;>" + element["birth_rate_per_1000"] + "</td>");
          $("#" + index).append("<td class=&quot;cell_phones_per_100&quot; >" + element["cell_phones_per_100"] + "</td>");
          $("#" + index).append("<td class=&quot;children_per_woman&quot;>" + element["children_per_woman"] + "</td>");
          $("#" + index).append("<td class=&quot;electricity_consumption_per_capita&quot;>" + element["electricity_consumption_per_capita"] + "</td>");
          $("#" + index).append("<td class=&quot;gdp_per_capita&quot;>" + element["gdp_per_capita"] + "</td>");
          $("#" + index).append("<td class=&quot;gdp_per_capita_growth&quot;>" + element["gdp_per_capita_growth"] + "</td>");
          $("#" + index).append("<td class=&quot;inflation_annual&quot;>" + element["inflation_annual"] + "</td>");
          $("#" + index).append("<td class=&quot;internet_user_per_100&quot;>" + element["internet_user_per_100"] + "</td>");
          $("#" + index).append("<td class=&quot;life_expectancy&quot;>" + element["life_expectancy"] + "</td>");
          $("#" + index).append("<td class=&quot;military_expenditure_percent_of_gdp&quot;>" + element["military_expenditure_percent_of_gdp"] + "</td>");
          $("#" + index).append("<td class=&quot;gps_lat&quot;>" + element["gps_lat"] + "</td>");
          $("#" + index).append("<td class=&quot;gps_long&quot;>" + element["gps_long"] + "</td>");
				});
			}, error: function(jqXHR, text, err) {
			}
		});
});


$("#show_selected_prop").click(function(e){
  e.preventDefault();
  var propSelection = document.getElementById("prop_selection");
  var id = propSelection.options[propSelection.selectedIndex].value;

  console.log(id);

  visibilityFct(id);
	});
$("#hide_selected_prop").click(function(e){
  e.preventDefault();
  var propSelection = document.getElementById("prop_selection");
  var id = propSelection.options[propSelection.selectedIndex].value;

  console.log(id);

  visibilityFct(id);
	});
$("add_submit").click(function(){
	var country_name = $("#country_name").val();
	var country_birth = $("#country_birth").val();
	var country_cellphone = $("#country_cellphone").val();
		//soll das machen, was getan werden soll, wenn "add country" geklickt wird
	});
$("#rm_submit").click(function(e){
  console.log("hi");
  e.preventDefault();
	var country_delete_id = pad($("#country_delete_id").val());

  var url = '';

  if (country_delete_id != 000){
    url = '/' + country_delete_id;
  }
  $.ajax({
			type: "DELETE",
			url: 'http://localhost:3000/items' + url,
			async: true,
      dataType: 'text',
			success: function(data) {
        alert(data);
        $.ajax({
      			type: "GET",
      			url: 'http://localhost:3000/items',
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
			}, error: function(jqXHR, text, err) {
			}
		});
	});
