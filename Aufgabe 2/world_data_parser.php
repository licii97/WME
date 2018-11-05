<?php
class WorldDataParser  {
	public function parseCSV($pfad)  
	{
		//array fgetcsv(resource $handle, integer $length, string $delimiter)
		//return array; 
		//$data; 
		$row = 1;
		if (($handle = fopen("world_data_v1.csv", "r")) !== FALSE) {
			while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$num = count($data);
				echo "<p> $num Felder in Zeile $row: <br /></p>\n";
				$row++;
				for ($c=0; $c < $num; $c++) {
					echo $data[$c] . "<br />\n";
				}
			}
			fclose($handle);
		}
		//return $data; 
	}
	
	public function saveXML()
	{
	//XML Datei soll im gleichen Ordner als  world_data.xml gespeichert werden
	}

	public functiom printXML()
	{
		
	}

?>