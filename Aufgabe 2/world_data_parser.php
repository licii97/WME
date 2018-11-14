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

	 	//enthält die Werte Spaltenköpfe
	 	$categories=array();
	 	
		$currentRow = 1;
		$numberOfCategories = 14; 

		// stelle sicher, dass die Datei gelesen werden kann
		$csvFile = fopen($csvPath, "r");

		// lese CSV ein, solange bis keine Daten mehr kommen 
		while (($csvData = fgetcsv($csvFile, 0, ",")) !== FALSE){
			//gehe pro Zeile jede Kategorie durch
			if ($currentRow==1){
				for ($i=0; $i<$numberOfCategories; $i++){
					$categrories[$i]=$csvData[$i];
				}
				$currentRow++;
			}

			else{

				for ($i=0; $i<$numberOfCategories; $i++){
						 $arrayRow[$categrories[$i]]=$csvData[$i];
					}

				$dataArray[]=$arrayRow;
	
				$currentRow++;
			}

		}
		fclose($csvFile);

		return $dataArray;
	}


	/*public function arrayToXml($array){
		//Root der XML-Datei 
		$root = new SimpleXMLElement('<root/>');
		$xmlFile = array_walk_recursive($array, array ($root, 'addChild'));
		return $xmlFile;
	}
	
	
	public function saveXML($dataArray) {
		$status=false; 

		$xmlDocument = fopen("./world_data.xml", "wa+"); 

   		// function returns false if an error occured, else true
	    if ($xmlDocument === true){
	    	$xmlDocument = new DOMDocument('1.0', 'utf-8');

	    	//wurzelelement erstellen 
			$root = $xmlDocument->createElement('world_data');

			// convert array to xml
			arrayToXml($dataArray, $xmlDocument, $root);

			//speichert file in ordner ab 
			$xmlDocument->save("./world_data.xml");

			status=true;
		}

		return $status; 
	}*/


	public function printXML() {
		echo "hello world";
	}

}
?>
