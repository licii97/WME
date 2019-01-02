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
			url: 'http://localhost:3000/properties',
			async: true,
			dataType: 'json',
			success: function(data) {
				$("#prop_selection").html("");
          $.each(data, function(index, element){
            $("#prop_selection").append("<option value=&quot;" + element + "&quot;>" + element + "</option>");
  				});
			}, error: function(jqXHR, text, err) {
			}
		});
  getFullTable();
});
//sobald auf "Filter Countries" geklickt wird, wird der passende Tabelleninhalt angefragt und dargestellt
$("#add_submit").click(function(e){
	e.preventDefault();
  $("#status_id").html("");
  $("#status_range").html("");

  //Inhalt aus Inputfeldern wird gespeichert
	var country_id = pad($("#country_filter_id").val());
	var country_id_range = $("#country_filter_range").val();

  //aufteilung in untere und obere Schranke
	const rangeID = country_id_range.split("-");
  //falls nötig: Nullen auffüllen
	const id1 = pad(rangeID[0]);
	const id2 = pad(rangeID[1]);

	var url = '';

  //damit wird sichergestellt, dass wenn eine Range angegeben ist, die einzelne ID nicht behandelt wird
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
        console.log(data);
        if (data.length == 0){
          $("#status_id").append("<p> No such id " + country_id + " in database.</p>");
          var x = document.getElementById('status_id');
          x.style.backgroundColor = "red";
        }
        $("#table_body").html("");
        $.each(data, function(index, element){
          $("#table_body").append("<tr id=" + index + "></tr>");
          $.each(element, function(key, value){
            $("#" + index).append("<td class=&quot" + key +"&quot;>" + value + "</td>");
          })
        });
			}, error: function(jqXHR, text, err) {
        if (country_id_range){
          $("#status_range").append("<p> Range not possible.</p>");
          var x = document.getElementById('status_range');
          x.style.backgroundColor = "red";
        }
      }
		});
});

// Sobald auf "Show" geklickt wird, wird die ausgewählte Property in der Tabelle wieder angezeigt
$("#show_selected_prop").click(function(e){
  e.preventDefault();
  var propSelection = document.getElementById("prop_selection");
  const n = propSelection.selectedIndex + 1;
  $('#world_data_table tr > *:nth-child('+n +')').show();
	});

// Sobald auf "Hide" geklickt wird, wird die ausgewählte Property aus der Tabelle gelöscht
$("#hide_selected_prop").click(function(e){
  e.preventDefault();
  var propSelection = document.getElementById("prop_selection");
  const n = propSelection.selectedIndex + 1;
  $('#world_data_table tr > *:nth-child('+n +')').hide();
	});

// Soabld auf "Add Country" geklickt wird, werden die Daten an den Server geschickt und hinzgefügt
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
        //Hinweiskasten
        $("#status_new_country").append("<p> Added country " + country_name + " to list!</p>");
        var x = document.getElementById('status_new_country');
        x.style.backgroundColor = "lightgreen";
        //verschwindet nach 2sek
        setTimeout(function(){$('#status_new_country').html("");}, 2000);
        // Danach wird erneut die aktuelle Tabelle komplett angezeit
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
        //Checkt, welche Statusmeldung zurückgekommen ist
        //je nachdem muss der Kasten rot oder grün sein
        var list = data.split(" ");
        switch(list[0]){
          case "Deleted":
          $("#status_deleted_country").append("<p>" + data + "</p>");
          var x = document.getElementById('status_deleted_country');
          x.style.backgroundColor = "lightgreen";
          setTimeout(function(){$('#status_deleted_country').html("");}, 2000);
          break;
          case "Item":
          $("#status_deleted_country").append("<p>" + data + "</p>");
          var x = document.getElementById('status_deleted_country');
          x.style.backgroundColor = "lightgreen";
          setTimeout(function(){$('#status_deleted_country').html("");}, 2000);
          break;
          case "No":
          $("#status_deleted_country").append("<p>" + data + "</p>");
          var x = document.getElementById('status_deleted_country');
          x.style.backgroundColor = "red";
          setTimeout(function(){$('#status_deleted_country').html("");}, 2000);
          break;
          default: break;
        }
        getFullTable();
			}, error: function(jqXHR, text, err) {
			}
		});
	});
