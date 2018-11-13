<?php 
require 'world_data_parser.php';

$wdp = new WorldDataParser();
$csv = $wdp->parseCSV("./world_data_v1.csv");
$xmlStatus = $wdp->saveXML($csv);

if ($xmlStatus === true ){
		echo "Success! The XML file has been saved. :)";
	} else {
		echo "Oh snap, the XML file could not be saved. :(";
	}

?>

