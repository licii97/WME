
/* Funktion um Tabellenspalten sichtbar und unsichtbar zu machen */
function visibilityFct(id) {
    var wert;
    var liste = document.getElementsByClassName(id);

    if (liste[0].style.display!="none"){
        wert="none";
    }
    else{
        wert="table-cell";
    }

    for (var index=0 ; index<liste.length; index++){
        liste[index].style.display=wert;
    }
}
