<?php

/*public function arrayToXml($dataArray, $xmlFile){
	echo "hello wolrd";
	}*/


class WorldDataParser {
	 function parseCSV($csvPath) {
	 	//großer Array, der alle Dtaen beinhaltet
	 	$dataArray = array(); 
	 	//hilfarray, damit man Daten einer Zeile in einem eigenem Array abspeichern kann
	 	$arrayRow = array(); 
	 	
		$currentRow = 1;
		$numberOfCategories = 14; 

		// stelle sicher, dass die Datei gelesen werden kann
		$csvFile = fopen($csvPath, "r");

		// lese CSV ein, solange bis keine Daten mehr kommen 
		while (($csvData = fgetcsv($csvFile, 0, ",")) !== FALSE){
			//gehe pro Zeile jede Kategorie durch
			for ($i=0; $i<$numberOfCategories; $i++){
					 $arrayRow[$i]=$csvData[$i];
				}

			$dataArray[]=$arrayRow;
			//$currentRow++;

		}
		fclose($csvFile);



		return $dataArray;
	}

	
	
	public function saveXML($dateArray) {
		$status=false; 

	//XML Datei soll im gleichen Ordner als  world_data.xml gespeichert werden
		return $status; 
	}

	public function printXML() {
		echo "hello world";
	}

}
?>
