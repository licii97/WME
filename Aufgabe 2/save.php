<?php 
require 'world_data_parser.php';

$wdp = new WorldDataParser();
$csv = $wdp->parseCSV("./world_data_v1.csv");
$xmlStatus = $wdp->saveXML($csv);

if ($xmlStatus === true ){
		echo "XML Savestatus: erfolgreich (1)";
	} else {
		echo "XML Savestatus: fehlgeschlagen (0)";
	} 


?>

