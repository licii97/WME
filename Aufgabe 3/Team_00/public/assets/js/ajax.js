//pad(n) füllt die mitgegebene Zahl mit genau so vielen Nullen auf, dass daraus eine passende ID wird
function pad(n) {
  n = n + '';
  return n.length >= 3 ? n : new Array(3 - n.length + 1).join(0) + n;
}
//holt die gesamte Tabelle ohne Filter
function getFullTable() {
  $.ajax({
      type: "GET",
      url: 'http://localhost:3000/items',
      async: true,
      dataType: 'json',
      success: function(data) {
        $("#table_body").html("");
        $.each(data, function(index, element){
          $("#table_body").append("<tr id=" + index + "></tr>");
          $.each(element, function(key, value){
            $("#" + index).append("<td class=&quot" + key +"&quot;>" + value + "</td>");
          })
        });
      }, error: function(jqXHR, text, err) {
      }
    });
}
//sobald die Website geladen ist, soll das Dropdown mit allen properties gefüllt werden
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
  getFullTable();
});
//sobald auf "Filter Countries" geklickt wird, wird der passende Tabelleninhalt angefragt und dargestellt
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
          $.each(element, function(key, value){
            $("#" + index).append("<td class=&quot" + key +"&quot;>" + value + "</td>");
          })
        });
			}, error: function(jqXHR, text, err) {
			}
		});
});

// Sobald auf "Show" geklickt wird, wird die ausgewählte Property in der Tabelle wieder angezeigt
$("#show_selected_prop").click(function(e){
  e.preventDefault();
  var propSelection = document.getElementById("prop_selection");
  var id = propSelection.options[propSelection.selectedIndex].value;

	});

// Sobald auf "Hide" geklickt wird, wird die ausgewählte Property aus der Tabelle gelöscht
$("#hide_selected_prop").click(function(e){
  e.preventDefault();
  var propSelection = document.getElementById("prop_selection");
  var id = propSelection.options[propSelection.selectedIndex].value;

	});

// Soabld auf "Add COuntry" geklickt wird, werden die Daten an den Server geschickt und hinzgefügt
// Danach wird erneut die aktuelle Tabelle komplett angezeit
$("#ad_submit").click(function(e){
  e.preventDefault();

	var country_name = $("#country_name").val();
	var country_birth = $("#country_birth").val();
	var country_cellphone = $("#country_cellphone").val();

  $.ajax({
			type: "POST",
			url: 'http://localhost:3000/items',
      data: JSON.stringify({name: country_name, birth_rate_per_1000: country_birth, cell_phones_per_100: country_cellphone}),
			async: true,
      contentType: "application/json",
      dataType: 'text',
			success: function(data) {
        alert(data);
        getFullTable();
			}, error: function(jqXHR, text, err) {
        console.log(err);
			}
		});
	});

// Löscht das durch die ID angegeben Land aus dem Dokument und zeigt danach aktuelle Tabelle an
$("#rm_submit").click(function(e){
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
        getFullTable();
			}, error: function(jqXHR, text, err) {
			}
		});
	});
