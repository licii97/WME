<?php

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



	//Funktion, um array in eine XML-Datei einzulesen
	public function arrayToXml(SimpleXMLElement $xmlElement, array $array){
		foreach($array as $key => $value) {
			if( is_numeric($key) ){
            	$key = 'item'.$key; //dealing with <0/>..<n/> issues
        	}

			//prüft, ob der wert ein array oder ein einzelwert ist
			if (is_array($value)){
				$newElement = $xmlElement->addChild($key);
				//führt die arrayToXml Konvertierung mit dem Wert durch 
				arrayToXml($newElement, $value);
			} 

			else {
				if ($key == (int) $key){
					$key = "key_$key";
				}
				//wenn der Wert kein array sondern ein einzelwert ist, dann kann man einfach das Schlüssel-Wert paar als neuen Knoten in die XML Datei einfügen 
				$xmlElement->addChild($key, $value);
			}
		}
		
	}
	

	
	public function saveXML($dataArray) {
		
	    	$xml = new SimpleXMLElement('<world_data><world_data/>');

	    	arrayToXml($xml, $dataArray);

			//speichert file in ordner ab 
			$xml->asXML("./world_data.xml");
			
			return (true);
		
	}


	public function printXML() {
		echo "hello world";
	}

}
?>
