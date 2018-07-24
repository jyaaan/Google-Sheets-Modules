// Main functions
function testDeals() {
  var testSheet = createTestSheet();
  createObjectTable(testSheet, getAllDeals());  
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Refresh Deal Data', functionName: 'testDeals'},
    {name: 'Generate Reports', functionName: 'generateReports'},
    {name: 'Update and Refresh', functionName: 'updateAndRefresh'},
    {name: 'Test API', functionName: 'testAPI'}
  ];
  
  SpreadsheetApp.getActive().addMenu('Cience', menuItems);
}

function testAPI() {
  testQuery();
}

function updateAndRefresh() {
  testDeals();
  generateReports();
}

function generateReports() {
  
  try {
    var sheet = loadSourceSheet();
  } catch(e) {
    SpreadsheetApp.getActiveSpreadsheet().toast(e);
    return;
  }
  
  var dataObject = createObjects(sheet);
  linkAppointments(dataObject);
  var KPI = generateKPI(dataObject);
  var dailyKPI = generateDailyKPI(dataObject);
  var monthlySales = generateMonthlySales(dataObject);
  var campaignMetrics = generateCampaignMetrics(dataObject);
  var conversionsByRSM = generateConversionsByRSM(dataObject);
  var appointments = generateAppointments(dataObject);
  var sources = generateSources(dataObject);
  var cycles = generateCycle(dataObject);
  var opps = generateOpps(dataObject);
  var pipeline = generatePipeline(dataObject);
//  getDataIntegrity(dataObject);
  
  const KPISheet = newSheet('Weekly');
  createObjectTable(KPISheet, KPI);
  const dailyKPISheet = newSheet('Daily');
  createObjectTable(dailyKPISheet, dailyKPI);
  const monthlySalesSheet = newSheet('Monthly');
  createObjectTable(monthlySalesSheet, monthlySales);
  const campaignMetricsSheet = newSheet('Campaign Metrics');
  createArrayTable(campaignMetricsSheet, campaignMetrics)
  const appointmentSheet = newSheet('Appointments');
  createObjectTable(appointmentSheet, appointments);
  const conversionsByRSMSheet = newSheet('ConvRSM');
  createArrayTable(conversionsByRSMSheet, conversionsByRSM);
  const sourcesSheet = newSheet('Sources');
  createArrayTable(sourcesSheet, sources);
  const cycleSheet = newSheet('Cycle');
  createArrayTable(cycleSheet, cycles);
  const oppsSheet = newSheet('Opps');
  createArrayTable(oppsSheet, opps);
  const pipelineSheet = newSheet('Pipeline');
  createArrayTable(pipelineSheet, pipeline);
  moveSheetToEnd(sheet);
  orderSheets();
}

function createTestSheet() {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Deal Data');
  
  if (sheet != null) {
    SpreadsheetApp.getActive().deleteSheet(sheet);
  }
  
  return newSheet('Deal Data');
  
}
