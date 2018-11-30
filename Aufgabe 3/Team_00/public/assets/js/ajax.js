/* folgendes zum senden von anfragen*/

xmlhttp=new XMLHttpRequest();

xmlhttp.responseText; //-> das vom server gelieferte ergebnis wird da ankommen und man kann sie so weiterverarbeiten

if (xmlhttp.readyState==4 && xmlhttp.status==200) //-> abfrage, ob alles geklappt hat auf dem server

xmlhttp.open("GET","..."+inhalt,true); // aufruf des programms auf der serverseite
																			// ich nehme an für "..." muss sowas wie "app.js?q=" oder "index.html/bla", ach keine ahnung :D
xmlhttp.send();


//inspiriert durch : https://www.tutorialrepublic.com/jquery-tutorial/jquery-ajax-get-and-post-requests.php


$("add_submit").click(function(){
	var country_id = $("#country_filter_id").val();
	var country_id_range = $("#country_filter_range").val();

	$.get("app.js"/*?? bin mir nicht sicher*/, {id: country_id, range: country_id_range} , function(data){/* Display the returned data in browser*/}); 
	//die funct. ist das, was der server mit den ermittelten daten machen soll. "data" sind dann genau diese ermittelten daten

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/items/id1/id2", //keine ahnung, ob das richtig ist
		async: true,
		success: function(data) {
		// Handle returned data
		}, error: function(jqXHR, text, err) {
		// Handle error if occured
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

