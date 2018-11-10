//parseCSV(), saveXML() und printXML() aufrufen

//die zurückgegebenen Daten von printXML() sollen in einer
//Tabelle wie in Aufgabe 1 (A1) ausgeben werden

<?php 
require 'world_data_parser.php';

$wdp = new WorldDataParser;
$csv = $wdp->parseCSV("world_data_v1.csv");

echo '<pre>' , var_dump($csv) , '</pre>';
?>

