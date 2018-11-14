<?php 
require 'world_data_parser.php';

$wdp = new WorldDataParser;
$csv = $wdp->parseCSV("world_data_v1.csv");

echo '<pre>' , print_r($csv) , '</pre>';
?>

