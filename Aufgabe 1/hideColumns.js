window.addEventListener('resize', function() {
  var classNames = ['birthRate', 'cellphones', 'children', 'electricUsage', 'internetUsage'];
  var width = window.innerWidth;
  if (width > 1200) {
    for (var i = 0; i < classNames.length; i++ ){
        var listOfColumns = document.getElementsByClassName(classNames[i]);
        for (var j = 0; j < listOfColumns.length; j++){
          listOfColumns[j].style.display="table-cell";
        }
    }
  }
  else if (768 < width < 1200) {
        coloumnsDisplayNone('internetUsage');

        for (var i = 0; i < (classNames.length - 1); i++ ){
            var listOfColumns = document.getElementsByClassName(classNames[i]);
            for (var j = 0; j < listOfColumns.length; j++){
              listOfColumns[j].style.display="table-cell";
            }
        }
  }
  else if (320 < width < 768) {
        coloumnsDisplayNone('internetUsage');
        coloumnsDisplayNone('electricUsage');

        for (var i = 0; i < (classNames.length - 2); i++ ){
            var listOfColumns = document.getElementsByClassName(classNames[i]);
            for (var j = 0; j < listOfColumns.length; j++){
              listOfColumns[j].style.display="table-cell";
            }
        }
  }
  else if (width < 320) {
        coloumnsDisplayNone('internetUsage');
        coloumnsDisplayNone('electricUsage');
        coloumnsDisplayNone('children');

        for (var i = 0; i < (classNames.length - 3); i++ ){
            var listOfColumns = document.getElementsByClassName(classNames[i]);
            for (var j = 0; j < listOfColumns.length; j++){
              listOfColumns[j].style.display="table-cell";
            }
        }
  }
});

function coloumnsDisplayNone (nameOfClass) {
  var listOfColumns = document.getElementsByClassName(nameOfClass);
  for (var j = 0; j < listOfColumns.length; j++){
    listOfColumns[j].style.display="none";
  }
}

function coloumnsDisplayTableCell (number) {
  for (var i = 0; i < (classNames.length - number); i++ ){
      var listOfColumns = document.getElementsByClassName(classNames[i]);
      for (var j = 0; j < listOfColumns.length; j++){
        listOfColumns[j].style.display="table-cell";
      }
  }
}
