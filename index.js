function onOpen() {
  var menuItems = [
    {name: 'Generate Reports', functionName: 'generateReports'}
  ];
  activeSpreadsheet.addMenu('Cience', menuItems);
}

function generateReports() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Source');
  var testObject = createObjects(sheet);
  Logger.log(testObject);
}

function createObjects(activeSheet) {
  var data = activeSheet.getDataRange().getValues();
  
  // clean and format data to prevent runtime errors
  // removes null rows and headless columns
  data = removeNull(data);
  
  // TEST
  Logger.log(data);
  
  return data.slice(1)
  .map(function(row) {
    var obj = {};
    row.forEach(function(val, i) {
      var prop = data[0][i];
      
      // nulling empty cells as they are empty strings by default
      obj[prop] = (typeof val === 'string' && !val.length) ? null : val;
    });
    return obj;
  })
}

function removeNull(data) {
  return data.filter(function(row) {
    return row.some(function(val) {
      return typeof val !== 'string' || val.length;
    })
  }).map(function(row) {
    return row.filter(function(val, i) {
      return data[0][i].length;
    })
  })
}

// sheet.getRange('C1').setValue(data);