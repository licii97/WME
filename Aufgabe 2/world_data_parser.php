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



	//Funktion, um array in eine XML-Datei einzulesen, inspiriert von: https://stackoverflow.com/questions/1397036/how-to-convert-array-to-simplexml
	public function arrayToXml($xmlElement, $array){
		//print("erster schritt geschafft");
		/*foreach($array as $key => $value) {
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
		}*/
		
	}
	

	
	public function saveXML($dataArray) {
		if (is_null($dataArray)){
			return false;
		}

		$xmlDocument = new DOMDocument('1.0', 'utf-8');
		// formatierter Output
		$xmlDocument->formatOutput = true;
		$root = $xmlDocument->createElement('Countries');
		$root = $xmlDocument->appendChild($root);

		foreach ($dataArray as $key => $value) {
			$country = $xmlDocument->createElement('Country');
			$country = $root->appendChild($country);

			foreach ($value as $key2 => $value2) {
				//echo $key2;
				//echo $value2;

				// schlüssel und wert in die richtige Form bringen -> strtok und rtrim
				$categoryNode = $xmlDocument->createElement(strtok($key2, " "), rtrim($value2));
				$country->appendChild($categoryNode);
			}
		}

		$xmlDocument->save("./world_data.xml");
		//var_dump($xmlDocument);
		return true; 
	}

	public function printXML($xmlPfad, $xslPfad) {
		if (is_null($xmlPfad)){
			return "XML Pfad fehlerhaft.";
		}

		if (is_null($xslPfad)){
			return "XSL Pfad fehlerhaft.";
		}

		$xsl = new DOMDocument();
		$xsl->load($xslPfad);

		$xml = new DOMDocument();
		$xml->load($xmlPfad);

		$xslProcessor = new XSLTProcessor();
		$xslProcessor->importStyleSheet($xsl);
		return $xslProcessor->transformToXML($xml);
	}

}

?>
