// Quelle: https://www.w3schools.com/howto/howto_js_sort_table.asp

function sortTableUp() {

  var table, rows, swapping, i, x, y, shouldSwap;

  table = document.getElementById("worldDataTable");

  swapping = true;

  while (swapping) {

    swapping = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {

      shouldSwap = false;

      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];

      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwap = true;
        break;
      }
    }
    if (shouldSwap) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      swapping = true;
    }
  }
}

function sortTableDown() {

    var table, rows, swapping, i, x, y, shouldSwap;

    table = document.getElementById("worldDataTable");

    swapping = true;

    while (swapping) {

      swapping = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {

        shouldSwap = false;

        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];

        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwap = true;
          break;
        }
      }
      if (shouldSwap) {

        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        swapping = true;
      }
    }
}
