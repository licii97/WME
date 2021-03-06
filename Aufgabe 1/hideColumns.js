window.addEventListener('resize', function() {
  var width = window.innerWidth;

  if (width > 1200) {
    var classNames = ['children', 'electricUsage', 'internetUsage'];

    coloumnsDisplayTableCell(classNames);
  }
  else if (width < 1200 && width > 768 ) {
    var classNames = ['children', 'electricUsage'];

    coloumnsDisplayNone('internetUsage');
    coloumnsDisplayTableCell(classNames);
  }
  else if (width < 768 && width > 320 ) {
    var classNames = ['children'];

    coloumnsDisplayNone('internetUsage');
    coloumnsDisplayNone('electricUsage');
    coloumnsDisplayTableCell(classNames);
  }
  else if (width < 320) {
    coloumnsDisplayNone('internetUsage');
    coloumnsDisplayNone('electricUsage');
    coloumnsDisplayNone('children');
  }
});

function coloumnsDisplayNone (nameOfClass) {
  var listOfColumns = document.getElementsByClassName(nameOfClass);

  for (var j = 0; j < listOfColumns.length; j++){
    listOfColumns[j].style.display="none";
  }
}

function coloumnsDisplayTableCell (classNames) {
  for (var i = 0; i < classNames.length; i++ ){
      var listOfColumns = document.getElementsByClassName(classNames[i]);
      
      for (var j = 0; j < listOfColumns.length; j++){
        listOfColumns[j].style.display="table-cell";
      }
  }
}
