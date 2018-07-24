// Table functions

function createObjectTable(sheet, objects) {
  // get headers
  try {
    const headers = Object.keys(objects[0]);
  } catch(e) {
    Logger.log(e);
    throw('Invalid object when creating table');
  }
  
  var rows = objects.map(function(obj) {
    var row = [];
    headers.forEach(function(header) {
       row.push(obj[header]);
    });
    return row;
  });
  
  rows.unshift(headers);

  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  
}

function createArrayTable(sheet, arr) {
  sheet.getRange(1, 1, arr.length, arr[0].length).setValues(arr);
}