// Functions to create array of objects from deal data
// These objects are used to generate reports

function createObjects(activeSheet) {
  
  var data = activeSheet.getDataRange().getValues();
  
  // clean and format data to prevent runtime errors
  // removes null rows and headless columns
  data = removeNull(data);
  
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

function spliceDupilcates(arr) {
  return [arr.filter(function(item, index, array) {
    return array.indexOf(item) == index;
  })];
}

function createObjectsFromArray(array) { // assumes header is first array
  const header = array[0];
  return array.slice(1)
  .map(function(val) {
    var obj = {};
    obj[header] = val;
    return obj;
  })
}

function generateKPI(dataObj) {
  const KPI = initializeWeeklyObject();
  calcNBMRR(dataObj, KPI, 'weekly');
  calcNBMRRCount(dataObj, KPI, 'weekly');
  calcAvNBMRR(KPI);
  calcNBCienceNow(dataObj, KPI, 'weekly');
  calcNBCienceNowCount(dataObj,KPI, 'weekly');
  calcAvCienceNow(KPI);
  calcSumNB(dataObj, KPI, 'weekly');
  calcNBCount(dataObj, KPI, 'weekly');
  calcNBSigs(dataObj, KPI, 'weekly');
  calcNBSigCount(dataObj, KPI, 'weekly');
  appointmentsScheduled(dataObj, KPI, 'weekly');
  appointmentsCompleted(dataObj, KPI, 'weekly');
  return KPI;
}

function generateDailyKPI(dataObj) {
  const KPI = initializeDailyObject();
  calcNBMRR(dataObj, KPI, 'daily');
  calcNBMRRCount(dataObj, KPI, 'daily');
  calcAvNBMRR(KPI);
  calcNBCienceNow(dataObj, KPI, 'daily');
  calcNBCienceNowCount(dataObj,KPI, 'daily');
  calcAvCienceNow(KPI);
  calcSumNB(dataObj, KPI, 'daily');
  calcNBCount(dataObj, KPI, 'daily');
  calcNBSigs(dataObj, KPI, 'daily');
  calcNBSigCount(dataObj, KPI, 'daily');
  appointmentsScheduled(dataObj, KPI, 'daily');
  appointmentsCompleted(dataObj, KPI, 'daily');
  return KPI;
}

function generateCampaignMetrics(dataObj) {
  const campaignMetrics = [];
  campaignMetrics.push(['Ave. Sales Cycle', getAvSalesCycle(dataObj)]);
  campaignMetrics.push(['Ave. Close Rate', getAvCloseRate(dataObj)]);
  campaignMetrics.push(['Ave. Opps Created', getAvOppCreated(dataObj)]);
  return campaignMetrics;
}

function generateMonthlySales(dataObj) {
  const monthlySales = initializeMonthlyObject();
  calcNBMRR(dataObj, monthlySales, 'monthly');
  calcNBCienceNow(dataObj, monthlySales, 'monthly');
  appointmentsScheduled(dataObj, monthlySales, 'monthly');
  return monthlySales;
}

function generateAppointments(dataObj) {
  const appointments = initializeWeeklyObject();
  getAppointmentCount(dataObj, appointments, 'Negative Response', 'weekly')
  getAppointmentCount(dataObj, appointments, 'Positive Response', 'weekly')
  getAppointmentCount(dataObj, appointments, 'Appointment Scheduled', 'weekly')
  getAppointmentCount(dataObj, appointments, 'Closed Won', 'weekly')
  getAppointmentCount(dataObj, appointments, 'No Show - No Reschedule', 'weekly')
  getAppointmentCount(dataObj, appointments, 'Closed Lost', 'weekly')
  return appointments;
}

function getRSMNames(dataObj) {
  const RSMNames = dataObj.filter(function(row) {
    return row['Pipeline'] == 'RSM Pipeline';
  })
  .map(function(row) {
    return row['HubSpot Owner'];
  })
  
  return spliceDupilcates(RSMNames)[0];
}

// count of all "- SDR" togther in SDR all. as well as inbound (SDR generated) "if it says sdr, just add it"
function generateSources(dataObj) {
  var sources = [];
  sources.push(['Source', 'RSM Closed Won', 'SDR Closed Won']);
  var distinctSources = dataObj.map(function(row) {
    return row['Source'];
  }).filter(function(value, index, self) {
    return self.indexOf(value) === index;     
  })
  distinctSources.forEach(function(source) {
    var RSMnumber = dataObj.filter(function(row) {
      return (row['Source'] == source && row['Deal Stage'] == 'Closed Won' && row['Pipeline'] == 'RSM Pipeline');
    }).length;
    var SDRnumber = dataObj.filter(function(row) {
      return (row['Source'] == source && row['Deal Stage'] == 'Closed Won' && row['Pipeline'] == 'SDR Appointments');
    }).length;
//    var tempObj = {};
//    tempObj[source] = number;
    sources.push([source, RSMnumber, SDRnumber]);
  })
  return sources;
}

function generateCycle(dataObj) {
  var cycles = [];
  cycles.push(['Source', 'Av. Duration', 'Count']);
  var wonDeals = dataObj.filter(function(row) {
    return row['Deal Stage'] == 'Closed Won';
  });
  var SDRDeals = wonDeals.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments'; // also source = inbound (sdr generated)
  })
  cycles.push(['SDR', SDRDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr) }, 0) / SDRDeals.length, SDRDeals.length]);
  var RSMInboundDeals = wonDeals.filter(function(row) {
    return (row['Pipeline'] == 'RSM Pipeline' && row['Source'] == 'Inbound'); // ignoring partnerships, inbound sdr generated(own), and facebook
  })
  cycles.push(['RSM Inbound', RSMInboundDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr); }, 0) / RSMInboundDeals.length, RSMInboundDeals.length]);
  var RSMOtherDeals = wonDeals.filter(function(row) {
    return (row['Pipeline'] == 'RSM Pipeline' && row['Source'] != 'Inbound' && row['Source'] != 'Current Client' && row['Source'] != 'RSM (Self Generated)' 
            && row['Source'] != 'Inbound (SDR Generated)' && row['Source'] != 'Client Referral');
  })
  cycles.push(['RSM Outbound', RSMOtherDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr); }, 0) / RSMOtherDeals.length, RSMOtherDeals.length]);

  var tempDeals = wonDeals.filter(function(row) {
    return (row['Pipeline'] == 'RSM Pipeline' && row['Source'] == 'RSM (Self Generated)');
  })
  cycles.push(['RSM Self Generated', tempDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr); }, 0) / tempDeals.length, tempDeals.length]);
  
  var tempDeals = wonDeals.filter(function(row) {
    return (row['Pipeline'] == 'RSM Pipeline' && row['Source'] == 'Inbound (SDR Generated)');
  })
  cycles.push(['Inbound SDR', tempDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr); }, 0) / tempDeals.length, tempDeals.length]);
  
  var tempDeals = wonDeals.filter(function(row) {
    return (row['Pipeline'] == 'RSM Pipeline' && row['Source'] == 'Current Client');
  })
  cycles.push(['Current Client', tempDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr); }, 0) / tempDeals.length, tempDeals.length]);
  
  var tempDeals = wonDeals.filter(function(row) {
    return (row['Pipeline'] == 'RSM Pipeline' && row['Source'] == 'Client Referral');
  })
  cycles.push(['Client Referral', tempDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr); }, 0) / tempDeals.length, tempDeals.length]);
  
  return cycles;
}

function generateConversionsByRSM(dataObj) {
  var RSMConv = [];
  RSMConv.push(['Rep', 'App to Opp', 'Opp to Deal', 'App to Won']);
  RSMConv.push([1, 2, 3, 4]);
  var RSMNames = getRSMNames(dataObj);
  RSMNames.forEach(function(name) {
    RSMConv.push([name, 2, 3, 4]);
  })
//  RSMNames[0].map(function(name) {
//    calcConversion(dataObj, monthlyConversions, name, 'monthly');
//    calcOppCreation(dataObj, monthlyConversions, name, 'monthly');
//  })
  return RSMConv;
}

function appToOpp(dataObj, RSMName) {
  var totAppointments = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && row['HubSpot Owner'] == RSMName;
  })
}


/* old
function generateConversionsByRSM(dataObj) {
  var monthlyConversions = initializeMonthlyObject();
  Logger.log(monthlyConversions);
  var testRSMNames = getRSMNames(dataObj);
  Logger.log(testRSMNames[0]);
  testRSMNames[0].map(function(name) {
    calcConversion(dataObj, monthlyConversions, name, 'monthly');
    calcOppCreation(dataObj, monthlyConversions, name, 'monthly');
  })
  return monthlyConversions;
}
*/
function generateOpps(dataObj) {
  var opps = [];
  
  var RSMDeals = dataObj.filter(function(row) {
    return row['Pipeline'] == 'RSM Pipeline';
  });
  
  var RSMWonDeals = RSMDeals.filter(function(row) {
    return row['Deal Stage'] == 'Closed Won';
  });
  
  var RSMLostDeals = RSMDeals.filter(function(row) {
    return row['Deal Stage'] == 'Closed Lost' || row['Deal Stage'] == 'Closed - Revisit Later';
  });
  
  var RSMOpenDeals = RSMDeals.filter(function(row) {
//    return row['Deal Stage'].indexOf('Closed') > -1;
    return row['Deal Stage'] != 'Closed Lost' && row['Deal Stage'] != 'Closed - Revisit Later' && row['Deal Stage'] != 'Closed Won';
  });
  
  var distinctRSM = RSMDeals.map(function(row) {
    return row['HubSpot Owner'];
  }).filter(function(value, index, self) {
    return self.indexOf(value) === index;     
  });
  
  opps.push(['Source', 'Open Deals', 'Av. Deal Duration', 'CW MRR', 'CW CN', 'Closed Lost', 'Open Av. Dur.']);
  opps.push(['Overall', RSMOpenDeals.length, RSMWonDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr) }, 0) / RSMWonDeals.length,
             RSMWonDeals.filter(function(row) { return row['Solution'] != 'Cience Now'}).reduce(function(acc, curr) { return acc + curr['Amount'] }, 0),
             RSMWonDeals.filter(function(row) { return row['Solution'] == 'Cience Now'}).reduce(function(acc, curr) { return acc + curr['Amount'] }, 0),
             RSMLostDeals.reduce(function(acc, curr) { return acc + curr['Amount'] }, 0),
             RSMOpenDeals.reduce(function(acc, curr) { return acc + getOpenDealDuration(curr) }, 0) / RSMOpenDeals.length]);
  
  distinctRSM.forEach(function(RSM) {
    var indivDeals = RSMWonDeals.filter(function(row) {
      return row['HubSpot Owner'] == RSM;
    });
    var indivOpenDeals = RSMOpenDeals.filter(function(row) {
      return row['HubSpot Owner'] == RSM;
    });
    var indivLostDeals = RSMLostDeals.filter(function(row) {
      return row['HubSpot Owner'] == RSM;
    });
    opps.push([RSM, indivOpenDeals.length, indivDeals.reduce(function(acc, curr) { return acc + getDealDuration(curr) }, 0) / indivDeals.length, 
               indivDeals.filter(function(row) { return row['Solution'] != 'Cience Now'}).reduce(function(acc, curr) { return acc + curr['Amount'] }, 0),
               indivDeals.filter(function(row) { return row['Solution'] == 'Cience Now'}).reduce(function(acc, curr) { return acc + curr['Amount'] }, 0),
               indivLostDeals.reduce(function(acc, curr) { return acc + curr['Amount'] }, 0),
               indivOpenDeals.reduce(function(acc, curr) { return acc + getOpenDealDuration(curr) }, 0) / indivOpenDeals.length]);
  })
  
  return opps;
}

function generatePipeline(dataObj) {
  var pipeline = [];
  pipeline.push(['Stage', 'CNow - Ct', 'CNow - Amt', 'MRR - Ct', 'MRR - Amt']);
  
  var CNDeals = dataObj.filter(function(row) {
    return row['Solution'] == 'Cience Now';
  });
  var nonCNDeals = dataObj.filter(function(row) {
    return row['Solution'] != 'Cience Now';
  });
  var stages = ['SOW Signed', 'SOW Sent', 'Negotiation', 'Evaluation', 'Calibration', 'Discovery'];
  stages.forEach(function(stage) {
    var stageCN = CNDeals.filter(function(row) {
      return row['Deal Stage'] == stage;
    });
    var stageNonCN = nonCNDeals.filter(function(row) {
      return row['Deal Stage'] == stage;
    });
    pipeline.push([stage, stageCN.length, stageCN.reduce(function(acc, curr) { return acc + curr['Amount']; }, 0), stageNonCN.length, stageNonCN.reduce(function(acc, curr) { return acc + curr['Amount']; }, 0)]);
  })
  return pipeline;
}
