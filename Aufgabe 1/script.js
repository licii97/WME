
/* Funktion um Tabellenspalten sichtbar und unsichtbar zu machen */
function visibilityFct(id) {
    var liste = document.getElementsByClassName(id);
    for (var index=0 ; index<liste.length; index++){
        liste[index].style.display="none";
    }
}
