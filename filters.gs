// Filter functions

// Return objects between two dates.

function getRowsBetween(obj, beginDate, endDate, columnHeader) { // for objects!
  return obj.filter(function(row) {
    return (row[columnHeader] >= beginDate && row[columnHeader] < endDate);
  })
}