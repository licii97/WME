//sobald die Website geladen ist, soll das Dropdown mit allen properties gefüllt werden
$('document').ready(function(e){
  $.ajax({
		type: "GET",
		url: 'http://localhost:3000/properties',
		async: true,
		dataType: 'json',
		success: function(data) {console.log(data);

			$("#prop_selection_1").html("");
        $.each(data, function(index, element){
          $("#prop_selection_1").append("<option value=&quot;" + element + "&quot;>" + element + "</option>");
  			});
      $("#prop_selection_2").html("");
        $.each(data, function(index, element){
          $("#prop_selection_2").append("<option value=&quot;" + element + "&quot;>" + element + "</option>");
    		});
		}, error: function(jqXHR, text, err) {
		}
	});
});

$('#prop_selection_1').on('change', function() {
  console.log("onchange!");
  var propSelection = document.getElementById("prop_selection_1");
  console.log("propSel: " + propSelection);

  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/items',
    async: true,
    dataType: 'json',
    success: function(data) {
      console.log("data: " +data);
      var selectedProp = propSelection.options[propSelection.selectedIndex].value;
      console.log("selectedProp: " +selectedProp);
      var chartData = [];

      $.each(data, function(index, element){
        console.log(element[selectedProp]);
        chartData.push(element[selectedProp]);
      });

      console.log("chartdata: " + chartData);

      d3.select(".first_chart")
        .selectAll("div")
        .data(chartData)
        .enter().append("div")
        .style("width", function(d) { return d * 10 + "px"; })
        .text(function(d) { return d; });

      /*$("#table_body").html("");
      $.each(data, function(index, element){
        $("#table_body").append("<tr id=" + index + "></tr>");
        $.each(element, function(key, value){
          $("#" + index).append("<td class=&quot" + key +"&quot;>" + value + "</td>");
        })
      });*/
    }, error: function(jqXHR, text, err) {
    }
  });
});
