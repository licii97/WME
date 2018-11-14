<?php 
require 'world_data_parser.php';

$wdp = new WorldDataParser();
$csv = $wdp->parseCSV("./world_data_v1.csv");
$xmlStatus = $wdp->saveXML($csv);

if ($xmlStatus === true ){
		echo "Die XML-Datei wurde erfolgreich erstellt und gespeichert.";
	} else {
		echo "Fehler beim Erstellen und Speichern der XML-Datei";
	} 

?>

