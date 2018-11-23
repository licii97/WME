<!DOCTYPE html>
<html lang="zxx">
		<head>
			<meta charset="utf-8"/>
			<link rel="Stylesheet" type="text/css" href="htmlReset.css"/>
			<link rel="Stylesheet" type="text/css" href="stylesheet.css"/>
			<script src="showHideFct.js"></script>
			<script src="sortTable.js"></script>
			<script src="hideColumns.js"></script>
            <!--Einbindung der Icons-->
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
			<title>World Data</title>
			<meta name="author" content="Felicitas Schmelz, Verona Kolpe ">
			<meta name="description" content="1. Übungsaufgabe zur Vorlesung Web und Multimedia Engineering">
			<meta name="keywords" content="Web und Multimedia Engineering, Übung, TU Dresden, erste Aufgabe">
		</head>
		<body>
			<header>
                <div id="wrapperImg">
                <a href="" id="worldImg"></a>
                </div>
				<nav>
					<ul>
            <li><a href=""><i style="line-height: 100px;" class="fas fa-list-ul"></i> A1 - Table</a></li>
						<li><a href="./parse.php"><i style="line-height: 100px;" class="fas fa-list-ul"></i> A2 - Parse</a></li>
						<li><a href="./save.php"><i style="line-height: 100px;" class="fas fa-list-ul"></i> A2 - Save</a></li>
						<li><a href="./print.php"><i style="line-height: 100px;" class="fas fa-list-ul"></i> A2 - Print</a></li>
						<li><a href=""><i style="line-height: 100px;" class="fas fa-list-ul"></i> A3 - REST</a></li>
						<li><a href=""><i style="line-height: 100px;" class="fas fa-list-ul"></i> A4 - Vis</a></li>
					</ul>
				</nav>
			</header>

			<div id="inhalt">
				
				<h1> World Data Overview ...</h1>
				<p id="showHide1">
						Show/Hide :
						<a onclick="visibilityFct('birthRate')">birth rate</a> |
						<a onclick="visibilityFct('cellphones')">cellphones</a> |
						<a onclick="visibilityFct('children')">children / woman</a> |
						<a onclick="visibilityFct('electricUsage')">electric usage</a> |
						<a onclick="visibilityFct('internetUsage')">internet usage</a>
				</p>
			
				<!--erstellen der Tabelle -->
				<?php 
					require 'world_data_parser.php';

					$wdp = new WorldDataParser;
					$csv = $wdp->parseCSV("./world_data_v1.csv");

					$resultSave = $wdp->saveXML($csv);

					if ($resultSave===true){
						echo ($wdp->printXML("./world_data.xml", "./world_data_xsl.xsl"));
					}
					else{
						echo "XML Document konnte nicht gespeichert werden."; 
					}
					
				?>

				<p id="showHide2">

					Show/Hide :
					<a onclick="visibilityFct('birthRate')">birth rate</a> |
					<a onclick="visibilityFct('cellphones')">cellphones</a> |
					<a onclick="visibilityFct('children')">children / woman</a> |
					<a onclick="visibilityFct('electricUsage')">electric usage</a> |
					<a onclick="visibilityFct('internetUsage')">internet usage</a>

				</p>

				<footer>
					<div class="left">Copyright 2018 world_data<br>First course exercise HTML, CSS and JS of the lecture Web and Multimedia Engineering.</div>
					<div class="right">This solution has been created by:<br> Team 3</div>

				</footer>
			</div>
		</body>
</html>
