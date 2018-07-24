// Sheet CRUD functions

function loadSourceSheet() {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Deal Data');
  
  if (sheet != null) {
    return sheet;
  } else {
    throw ('Deal Data sheet not found');
  }
  
}

// Creates and returns new sheet
// Checks if sheet of same name exists and WILL CLEAR IT if it does

function newSheet(sheetName) {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (sheet != null) {
    sheet.clear();
    return sheet;
  } else {
    return SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
  }
}

function moveSheetToEnd(sheet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Deal Data'));
  ss.moveActiveSheet(ss.getNumSheets());
}
/*
Daily
Weekly
Monthly
Opps
Source/Cycle
ConvRSM
ConvSDR
Appointments (Note: delete duplicate appointment tab)
FormStore
DealData
*/

function orderSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Daily'));
  ss.moveActiveSheet(1);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Weekly'));
  ss.moveActiveSheet(2);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Monthly'));
  ss.moveActiveSheet(3);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pipeline'));
  ss.moveActiveSheet(4);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Opps'));
  ss.moveActiveSheet(5);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sources'));
  ss.moveActiveSheet(6);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Cycle'));
  ss.moveActiveSheet(7);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ConvRSM'));
  ss.moveActiveSheet(8);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Appointments'));
  ss.moveActiveSheet(9);
  ss.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Campaign Metrics'));
  ss.moveActiveSheet(10);
}